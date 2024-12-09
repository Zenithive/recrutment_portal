import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Get the usertype from the cookies (could be undefined)
  // const userTypeCookie = request.cookies.get("usertype")?.value; // Access the cookie value safely
  // const passwordCookie = request.cookies.get("password");

  // If usertype is 'student' and trying to access a page other than /login or /question
  // if (userTypeCookie === "student" && !["/login", "/question"].includes(request.nextUrl.pathname)) {
  //   // Redirect to login page if trying to access an unauthorized page
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // // If password cookie is missing and trying to access /question, redirect to login
  // if (request.nextUrl.pathname === "/question" && !passwordCookie) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Continue with the default session handling
  return await updateSession(request);
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
