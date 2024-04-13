import { Auth } from "../Component/Auth"
import { Quote } from "../Component/Quote"



export const Signup = () => {

  return (
    <div className="grid md:grid-cols-2">
      <div>
        <Auth type={"Signup"}/>
      </div>
      <div className="invisible md:visible">
      <Quote/>
      </div>

    </div>
  )
}

