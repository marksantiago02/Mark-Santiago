import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { popUpFromBottomForText } from '../../content/FramerMotionVariants'
import AnimatedText from '../FramerMotion/AnimatedText'
import AnimatedHeading from '../FramerMotion/AnimatedHeading'
import { profileInfo } from '@utils/data/profileInfo'

export default function Comment() {
  return (
    <div id="comment" className="dark:bg-darkPrimary !relative">
      {/* Get in touch top section */}
      <section className="pt-6 text-center w-full-width dark:bg-darkPrimary dark:text-white">
        <AnimatedHeading variants={popUpFromBottomForText} className="text-4xl font-bold">
          Comment
        </AnimatedHeading>

        <AnimatedText variants={popUpFromBottomForText} className="px-4 py-2 font-medium dark:text-gray-300">
          Respectful and constructive dialogue is key to fostering a positive and enriching environment for everyone.
          We value your input and look forward to reading what you have to say. So go ahead, express yourself, and
          let's create an insightful and engaging discussion together!. 🗣️
          <br />
          <span className="text-sky-600">{profileInfo.email}</span>
        </AnimatedText>
      </section>
    </div>
  )
}
