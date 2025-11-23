import { Music, Music2, Music3, Music4, Mic, Mic2, Disc, Speaker, Radio, Headphones } from "lucide-react"

export function MusicalBackground() {
  const icons = [
    { Icon: Music, left: "10%", delay: "0s", duration: "15s", size: "w-12 h-12" },
    { Icon: Music2, left: "20%", delay: "2s", duration: "18s", size: "w-8 h-8" },
    { Icon: Music3, left: "85%", delay: "5s", duration: "20s", size: "w-10 h-10" },
    { Icon: Mic, left: "70%", delay: "1s", duration: "25s", size: "w-14 h-14" },
    { Icon: Disc, left: "40%", delay: "7s", duration: "22s", size: "w-16 h-16" },
    { Icon: Headphones, left: "60%", delay: "3s", duration: "19s", size: "w-12 h-12" },
    { Icon: Music4, left: "30%", delay: "10s", duration: "16s", size: "w-8 h-8" },
    { Icon: Speaker, left: "80%", delay: "8s", duration: "24s", size: "w-10 h-10" },
    { Icon: Radio, left: "15%", delay: "12s", duration: "21s", size: "w-14 h-14" },
    { Icon: Mic2, left: "90%", delay: "4s", duration: "17s", size: "w-12 h-12" },
    { Icon: Music, left: "50%", delay: "6s", duration: "23s", size: "w-8 h-8" },
    { Icon: Music2, left: "5%", delay: "9s", duration: "20s", size: "w-10 h-10" },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-linear-to-b from-purple-50/50 via-white to-orange-50/50">
      {icons.map((item, index) => (
        <div
          key={index}
          className="absolute text-purple-200/40 dark:text-purple-900/20"
          style={{
            left: item.left,
            animation: `float ${item.duration} linear infinite`,
            animationDelay: item.delay,
            bottom: "-100px", // Start below the screen
          }}
        >
          <item.Icon className={item.size} />
        </div>
      ))}
    </div>
  )
}
