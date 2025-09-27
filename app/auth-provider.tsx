import { cookies } from "next/headers";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import Header from "../components/Header";
import AnnouncementBar from "../components/AnnouncementBar";

function getUserFromCookie(cookieStore: ReadonlyRequestCookies) {
  const userStr = cookieStore.get("user")?.value;
  if (!userStr) return null;
  try {
    return JSON.parse(decodeURIComponent(userStr));
  } catch {
    return null;
  }
}

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const user = getUserFromCookie(cookieStore);
  const isAuthenticated = !!(accessToken && user);
  // Truyền props xuống Header, render children bình thường
  return (
    <>
      <AnnouncementBar />
      <Header isAuthenticated={isAuthenticated} user={user} />
      {children}
    </>
  );
}
