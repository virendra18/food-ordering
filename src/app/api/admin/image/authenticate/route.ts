import imagekit from "@/lib/imagekitConfig";

export async function GET(request: Request) {
  const result = imagekit.getAuthenticationParameters();

  return Response.json(result);
}
