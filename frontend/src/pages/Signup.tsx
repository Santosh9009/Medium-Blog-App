import { Auth } from "../Component/Auth"
import { Quote } from "../Component/Quote"


export const Signup = () => {
  return (
    <div className="grid md:grid-cols-2">
      <div className="">
        <Auth/>
      </div>
      <div className="invisible md:visible">
      <Quote/>
      </div>
    </div>
  )
}

