import Cookies from "js-cookie"

const fetchCookie = async () => {

   const apiUrl = import.meta.env.VITE_API_URL;
   const cookieName = import.meta.env.VITE_COOKIE_SESSION_NAME;

   try {
      const res = await fetch(
         `${apiUrl}/sessions/usersimple`, 
         {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get(cookieName)}`} }
      )

      if (!res.ok) {
         throw new Error(`Failed to fetch cookie. Status code: ${res.status}`);
      }

      const data = await res.json()
      return data
   }
   catch (error) {
      console.error(error);
      throw new Error("Failed to fetch cookie.")
   }
}
export default fetchCookie