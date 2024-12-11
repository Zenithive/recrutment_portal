import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Retrieve usertype and password from cookies
  const usertype = request.cookies.get("usertype")?.value;
  // console.log(`usertype`, usertype);
  const password = request.cookies.get("password")?.value;

  // If no usertype is found, restrict access to only /login page
  if (!usertype && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
  }

  // If usertype is 'student', restrict access to only /login and /question
  if (usertype === "student" && !["/login", "/question"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
  }

  // If the user is admin and password is not set, restrict access
  if (usertype === "admin" && !password) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if password is missing
  }

  // Allow access for other valid cases
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
