export async function POST() {
  const user = {
    id: "12345",
    name: "John Doe",
    email: "johndoe@example.com",
    image: "https://example.com/avatar.jpg",
    cognitoGroups: ["user"],
    accessToken: "mockAccessToken",
    refreshToken: "mockRefreshToken",
    idToken: "mockIdToken",
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expiration time (1 hour from now)
    role: "USER"
}
  return Response.json({ user })
}