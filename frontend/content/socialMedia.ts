import { SocialPlatform } from "@lib/types"
import { AiOutlineInstagram } from "react-icons/ai"
import { BsFacebook, BsGithub, BsLinkedin, BsYoutube, BsTwitter } from "react-icons/bs"
import { HiMail } from "react-icons/hi"

const socialMedia: SocialPlatform[] = [
  {
    title: "LinkedIn",
    Icon: BsLinkedin,
    url: "https://www.linkedin.com/in/mark-santiago-373172339/",
  },
  {
    title: "Github",
    Icon: BsGithub,
    url: "https://github.com/BTC415",
  },
  {
    title: "Instagram",
    Icon: AiOutlineInstagram,
    url: "https://www.instagram.com/marksantiago_0929/",
  },
  {
    title: "Facebook",
    Icon: BsFacebook,
    url: "https://www.facebook.com/profile.php?id=61569628505488&mibextid=ZbWKwL",
  },
    {
    title: "Twitter",
    Icon: BsTwitter,
    url: "https://www.x.com/MarkSantiago0929",
  },
  {
    title: "YouTube",
    Icon: BsYoutube,
    url: "https://www.youtube.com/channel/UCNNlfUfTU61QaJDWPEakkeg",
  },
  {
    title: "Mail",
    Icon: HiMail,
    url: "mailto:marksantiago0929@gmail.com",
  },
]

export default socialMedia
