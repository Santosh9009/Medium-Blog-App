import { Auth } from "../Component/Auth"
import { Quote } from "../Component/Quote"

export const Signin = () => {
  return (
  
    <div className="grid md:grid-cols-2">
      <div>
        <Auth type={"Signin"}/>
      </div>
      <div className="invisible md:visible">
      <Quote/>
      </div>

    </div>
  )
}

