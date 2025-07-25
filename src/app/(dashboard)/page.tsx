import { headers } from "next/headers"
import { HomeView } from "../modules/home/ui/views/home-view"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

const Page = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    redirect("/sign-in")
  }
  return <HomeView />
}

export default Page