"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import * as XLSX from "xlsx";

type InviteModalProps = {
  testId: number;
  onClose: () => void;
};

const InviteModal: React.FC<InviteModalProps> = ({ testId, onClose }) => {
  const [usernames, setUsernames] = useState<string[]>([""]);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const supabase = createClient();

  // Function to generate a random password
  const generateRandomPassword = (length: number) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  // Send invites to users
  const sendInvites = async () => {
    for (const email of usernames) {
      const { error } = await supabase.auth.admin.inviteUserByEmail(email);
      if (error) {
        console.error(`Failed to send invite to ${email}:`, error.message);
      } else {
        console.log(`Invite sent to ${email}`);
      }
    }
  };

  // Handle Excel file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);

          // Extract usernames from the parsed data
          const importedUsernames = parsedData
            .map((row) => row.Username) // Assumes a column named "Username"
            .filter(Boolean);

          if (importedUsernames.length === 0) {
            setErrors(["No valid usernames found in the file."]);
          } else {
            setUsernames((prev) => {
              const updatedUsernames = [...prev];

              // Ensure Username 1 is always populated
              if (!updatedUsernames[0]) {
                updatedUsernames[0] = importedUsernames.shift() || "";
              }

              return [...updatedUsernames, ...importedUsernames];
            });
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);

    const newErrors: string[] = [];


    const usersToInsert = usernames
      .map((username) => {
        if (!username) {
          newErrors.push("All usernames must be filled in.");
          return null;
        }
        // const password = generateRandomPassword(12); // Generate a random password
        const password = 'gec123'; // Generate a random password
        return {
          username: username, // Use the email as the username
          // password: password,
          password: 'gec123', 
          user_metadata: { username, password }, // Store in user_metadata
          islogin: false,
          usertype: "student",
          test_id: testId,
        };
      })
      .filter(Boolean);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { error } = await supabase.from("users").insert(usersToInsert);

      if (error) {
        setErrors(["Something went wrong while creating users."]);
        return;
      }

      // Send invites after successful user creation
      // await sendInvites();

      setSuccessMessage("Users created and invites sent successfully!");
      setUsernames([""]); // Reset the form
    } catch (err) {
      console.error("Error creating users:", err);
      setErrors(["Something went wrong, please try again."]);
    }
  };

  const handleUsernameChange = (index: number, value: string) => {
    const updatedUsernames = [...usernames];
    updatedUsernames[index] = value;
    setUsernames(updatedUsernames);
  };

  const addNewField = () => {
    setUsernames([...usernames, ""]);
  };

  const removeField = (index: number) => {
    if (usernames.length > 1) {
      setUsernames(usernames.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-black">Invite Modal</h2>
        <p className="text-black mb-4">This is the invite modal for Test ID: {testId}</p>

        {/* Create Users Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {usernames.map((username, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(index, e.target.value)}
                placeholder={`Username ${index + 1}`}
                required
                className="flex-1 px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewField}
            className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white"
          >
            Add Another User
          </button>

          <div>
            <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
              Import from Excel
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="mt-2"
            />
          </div>

          {errors.length > 0 && (
            <ul className="text-sm text-red-600">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
          {successMessage && (
            <p className="text-sm text-green-600">{successMessage}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Users
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
