"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Wifi,
  Camera,
  User,
  Heart,
  MapPin,
  MessageCircle,
  Shield,
  AlertTriangle,
  Lock,
  Activity,
  Eye,
  CheckCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/hooks/useGeolocation"

type AppStep = "landing" | "form" | "verification" | "preliminary" | "generating" | "result" | "offer"

// Mensajes de prueba de ventas actualizados sin ciudades/estados específicos
const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Jessica de Buenos Aires desbloqueó un informe hace 12 minutos",
    "✅ Sofía recientemente vio el historial de conversaciones",
    "✅ Marcela acaba de acceder a fotos confidenciales",
    "✅ Carolina completó un análisis completo ahora mismo",
    "✅ Andrea obtuvo acceso al informe confidencial hace unos momentos",
    "✅ Raquel realizó una verificación completa ahora mismo",
  ]

  useEffect(() => {
    if (show) {
      const randomMessage = salesMessages[Math.floor(Math.random() * salesMessages.length)]
      setCurrentMessage(randomMessage)
    }
  }, [show])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: -20 }}
      className="fixed bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4"
      style={{
        fontSize: "13px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{currentMessage}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 flex-shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Arrays organizados por género y franja etaria
const malePhotos1824 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg", // male-25-34-male-andyreiddvip.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg", // male-25-34-male-franchescox.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg", // male-25-34-male-augst_ts.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg", // male-25-34-male-nanoargentino.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg", // male-25-34-male-shyguyishere.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg", // male-25-34-male-carterlander08.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg", // male-25-34-male-matthewteddy.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg", // male-25-34-male-tomidiazj.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg", // male-25-34-male-latinblondarg.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg", // male-25-34-male-bushidoboy.jpg
]

const malePhotos2534 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg", // male-25-34-male-andyreiddvip.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg", // male-25-34-male-franchescox.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg", // male-25-34-male-augst_ts.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg", // male-25-34-male-nanoargentino.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg", // male-25-34-male-shyguyishere.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg", // male-25-34-male-carterlander08.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg", // male-25-34-male-matthewteddy.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg", // male-25-34-male-tomidiazj.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg", // male-25-34-male-latinblondarg.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg", // male-25-34-male-bushidoboy.jpg
]

const malePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-morocholatino87.jpg-bam8DFyuAfzBux5zmL9lscgSfnbJ4w.jpeg", // male-35-44-male-morocholatino87.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-ovalo-sex.jpg-TdxtGZRqBJy2V8x9kVfSml7x6QJpjt.jpeg", // male-35-44-male-ovalo-sex.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-josepbgfeet.jpg-f25HHQX8Dso5oQBIE1uCIP3oC3KYrd.jpeg", // male-35-44-male-josepbgfeet.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thesuitedboss.jpg-3CFJKVgZyyuzeIPk0klRBy6ixqjsHF.jpeg", // male-35-44-male-thesuitedboss.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoink.jpg-0YCHbmDqw9dWCItx4Of9GbWBbpiZOZ.jpeg", // male-35-44-male-nicoink.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoalpalo22.jpg-bPAd1S83ZoBGkoJyaKZ0BSEveTVHG1.jpeg", // male-35-44-male-nicoalpalo22.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-tunacho.jpg-2wHzLphZ2mKamlOeZmIfo1F09LM6pR.jpeg", // male-35-44-male-tunacho.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thebigitaliansub.jpg-rcFp57YB2XDXYQ1ObWSzBY0QDTVkcI.jpeg", // male-35-44-male-thebigitaliansub.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-puntogof.jpg-9b6bkanYwTL6acvIqT3AC87dvvnXFZ.jpeg", // male-35-44-male-puntogof.jpg
]

const malePhotos4554 = [
  // Placeholder para cuando reciba las imágenes 45-54
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/3SJBR44DZ9c6pLRVDTA0Ww/public/male/45-54/male-45-54-hombrelatinoarg.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/2xC10Dbr0Yi98WJdnWWgm4/public/male/45-54/male-45-54-petemastersxxx.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/wKcNRFe1QqreA4CfjbJQ7a/public/male/45-54/male-45-54-scorcherb8.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/0TwfWC666HpVosmkj_QPc_/public/male/45-54/male-45-54-coachtennisdad.jpg",
]

const femalePhotos1824 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg", // female-18-24-female-ScarletBae.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg", // female-18-24-female-born2bscene.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg", // female-18-24-female-liliafourtwenty.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg", // female-18-24-female-louprival.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg", // female-18-24-female-babygirlmiza.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg", // female-18-24-female-imjuliequeen.jpg
  "https://blobs.vusercontent.net/blob/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg", // female-18-24-female-izzybunniesvip.jpg
]

const femalePhotos2534 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg", // female-25-34-female-bustanutters.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg", // female-25-34-female-megnut.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg", // female-25-34-female-siswet.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg", // female-25-34-female-ThorriandJax.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg", // female-25-34-female-juicyjade9.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg", // female-25-34-female-ruth_lee.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg", // female-25-34-female-graciebon1.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-brujita.roja.jpg-KZxlryBKf0XVbOHRNdGAMBpPQTa82Z.jpeg", // female-25-34-female-brujita.roja.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-toomanypeaches.jpg-6PDRsf3v2Nalrv9eRaku1bX8wh5kOe.jpeg", // female-25-34-female-toomanypeaches.jpg
]

const femalePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-belle_oharaxxx.jpg-Pq9aUAbtUDVI9UrrzZJlkfEC0cxuQv.jpeg", // female-35-44-female-belle_oharaxxx.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-txhotwife84_free.jpg-QV1C6Nj4fbSzTRIyGs7p4kiqtozXCx.jpeg", // female-35-44-female-txhotwife84_free.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-malmalloy.jpg-B7c4Pg36GwUFFIayybP0fiyWqkv51R.jpeg", // female-35-44-female-malmalloy.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-anialisimo.jpg-EcQ66PmaeU25fFT0xV8udt4mMqLwhC.jpeg", // female-35-44-female-anialisimo.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-syrenjaymes.jpg-N4w0IhzPmQNbX0BqZRFeTvdBdGNn3Y.jpeg", // female-35-44-female-syrenjaymes.jpg
]

const femalePhotos4554 = [
  // Placeholder para cuando reciba las imágenes 45-54
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/AEJxds2OT7Gt-B4VLJXv4a/public/female/45-54/female-45-54-annikarose69.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/1BUA6sJloJdt-jvL9MCX_i/public/female/45-54/female-45-54-AvrilShowers.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/ZP3nTnsBf-eH5TZPmJ2Y5l/public/female/45-54/female-45-54-casey_deluxe.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/0TwfWC666HpVosmkj_QPc_/public/female/45-54/female-45-54-coachtennisdad.jpg",
]

const maleNames = {
  "18-24": [
    "Mateo",
    "Santiago",
    "Sebastián",
    "Nicolás",
    "Alejandro",
    "Diego",
    "Samuel",
    "Benjamín",
    "Lucas",
    "Martín",
    "Emiliano",
    "Leonardo",
    "Joaquín",
    "Valentín",
    "Gabriel",
    "Daniel",
    "Adrián",
    "Bruno",
    "Carlos",
    "Felipe",
    "Ignacio",
    "Javier",
    "Juan",
    "Pablo",
    "Ricardo",
  ],
  "25-34": [
    "José",
    "Luis",
    "Fernando",
    "Manuel",
    "Francisco",
    "Miguel",
    "Pedro",
    "Andrés",
    "Jorge",
    "Eduardo",
    "Antonio",
    "Sergio",
    "Arturo",
    "Roberto",
    "Rubén",
    "Héctor",
    "Guillermo",
    "Rafael",
    "David",
    "Álvaro",
    "Gonzalo",
    "Cristian",
    "Esteban",
    "Fabio",
    "Ivan",
  ],
  "35-44": [
    "Juan Carlos",
    "Enrique",
    "Ramón",
    "Jesús",
    "Gerardo",
    "Alfredo",
    "Mauricio",
    "Gustavo",
    "Victor",
    "Alberto",
    "Rodolfo",
    "Armando",
    "César",
    "Ernesto",
    "Félix",
    "Gilberto",
    "Horacio",
    "Ismael",
    "Julio",
    "Lorenzo",
    "Mario",
    "Oscar",
    "Raúl",
    "Salvador",
    "Tomás",
  ],
  "45-54": [
    "Federico",
    "Ángel",
    "Agustín",
    "Damián",
    "Fabio",
    "Germán",
    "Israel",
    "Leandro",
    "Marcelo",
    "Néstor",
    "Orlando",
    "Patricio",
    "René",
    "Roque",
    "Teodoro",
    "Ulises",
    "Vicente",
    "Walter",
    "Xavier",
    "Yago",
    "Zacarías",
    "Adolfo",
    "Benito",
    "Camilo",
    "Dario",
  ],
}

const femaleNames = {
  "18-24": [
    "Sofía",
    "Valentina",
    "Isabella",
    "Camila",
    "Valeria",
    "Mariana",
    "Victoria",
    "Daniela",
    "Gabriela",
    "Andrea",
    "Romina",
    "Julieta",
    "Emilia",
    "Catalina",
    "Luna",
    "Martina",
    "Lucía",
    "Paula",
    "Florencia",
    "Alejandra",
    "Fernanda",
    "Natalia",
    "Sara",
    "Abigail",
    "Claudia",
  ],
  "25-34": [
    "María",
    "Laura",
    "Ana",
    "Carolina",
    "Jessica",
    "Michelle",
    "Patricia",
    "Sandra",
    "Verónica",
    "Diana",
    "Silvia",
    "Elena",
    "Beatriz",
    "Cristina",
    "Lorena",
    "Mónica",
    "Rosa",
    "Yolanda",
    "Adriana",
    "Blanca",
    "Carmen",
    "Dora",
    "Erika",
    "Fabiola",
    "Gloria",
  ],
  "35-44": [
    "Angélica",
    "Cecilia",
    "Esther",
    "Irene",
    "Julia",
    "Leticia",
    "Marcela",
    "Norma",
    "Olivia",
    "Paola",
    "Regina",
    "Teresa",
    "Ursula",
    "Viviana",
    "Ximena",
    "Zulema",
    "Aurora",
    "Brenda",
    "Clara",
    "Dolores",
    "Eugenia",
    "Flor",
    "Graciela",
    "Hilda",
    "Josefina",
  ],
  "45-54": [
    "Alicia",
    "Bertha",
    "Concepción",
    "Dolores",
    "Esperanza",
    "Felicia",
    "Georgina",
    "Inés",
    "Luisa",
    "Margarita",
    "Nélida",
    "Ofelia",
    "Pilar",
    "Ramona",
    "Stella",
    "Tania",
    "Úrsula",
    "Virginia",
    "Yasmín",
    "Zenaida",
    "Amalia",
    "Berta",
    "Carla",
    "Delia",
    "Elvira",
  ],
}
export default function SigiloX() {
  const [currentStep, setCurrentStep] = useState<AppStep>("landing")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [lastTinderUse, setLastTinderUse] = useState("")
  const [cityChange, setCityChange] = useState("")
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isPhotoPrivate, setIsPhotoPrivate] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationMessage, setVerificationMessage] = useState("Iniciando análisis...")
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatingMessage, setGeneratingMessage] = useState("Analizando fotos de perfil...")
  const [stepCompleted, setStepCompleted] = useState({
    profilePhotos: false,
    conversations: false,
    finalizing: false,
  })
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 50) // 9:50
  const [showSalesPopup, setShowSalesPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showSalesProof, setShowSalesProof] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [ageRange, setAgeRange] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [generatedProfiles, setGeneratedProfiles] = useState<any[]>([])
  const [selectedRandomPhoto, setSelectedRandomPhoto] = useState<string | null>(null)

  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+52",
    name: "México",
    flag: "🇲🇽",
    placeholder: "55 1234 5678",
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")

  const countries = [
    { code: "+1", name: "Estados Unidos", flag: "🇺🇸", placeholder: "(555) 123-4567" },
    { code: "+1", name: "Canadá", flag: "🇨🇦", placeholder: "(555) 123-4567" },
    { code: "+44", name: "Reino Unido", flag: "🇬🇧", placeholder: "7911 123456" },
    { code: "+33", name: "Francia", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
    { code: "+49", name: "Alemania", flag: "🇩🇪", placeholder: "1512 3456789" },
    { code: "+39", name: "Italia", flag: "🇮🇹", placeholder: "312 345 6789" },
    { code: "+34", name: "España", flag: "🇪🇸", placeholder: "612 34 56 78" },
    { code: "+351", name: "Portugal", flag: "🇵🇹", placeholder: "912 345 678" },
    { code: "+55", name: "Brasil", flag: "🇧🇷", placeholder: "(11) 99999-9999" },
    { code: "+54", name: "Argentina", flag: "🇦🇷", placeholder: "11 1234-5678" },
    { code: "+56", name: "Chile", flag: "🇨🇱", placeholder: "9 1234 5678" },
    { code: "+57", name: "Colombia", flag: "🇨🇴", placeholder: "300 1234567" },
    { code: "+51", name: "Perú", flag: "🇵🇪", placeholder: "912 345 678" },
    { code: "+58", name: "Venezuela", flag: "🇻🇪", placeholder: "412-1234567" },
    { code: "+593", name: "Ecuador", flag: "🇪🇨", placeholder: "99 123 4567" },
    { code: "+595", name: "Paraguay", flag: "🇵🇾", placeholder: "961 123456" },
    { code: "+598", name: "Uruguay", flag: "🇺🇾", placeholder: "94 123 456" },
    { code: "+591", name: "Bolivia", flag: "🇧🇴", placeholder: "71234567" },
    { code: "+81", name: "Japón", flag: "🇯🇵", placeholder: "90-1234-5678" },
    { code: "+82", name: "Corea del Sur", flag: "🇰🇷", placeholder: "10-1234-5678" },
    { code: "+86", name: "China", flag: "🇨🇳", placeholder: "138 0013 8000" },
    { code: "+91", name: "India", flag: "🇮🇳", placeholder: "81234 56789" },
    { code: "+61", name: "Australia", flag: "🇦🇺", placeholder: "412 345 678" },
    { code: "+64", name: "Nueva Zelanda", flag: "🇳🇿", placeholder: "21 123 4567" },
    { code: "+27", name: "Sudáfrica", flag: "🇿🇦", placeholder: "71 123 4567" },
    { code: "+20", name: "Egipto", flag: "🇪🇬", placeholder: "100 123 4567" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬", placeholder: "802 123 4567" },
    { code: "+254", name: "Kenia", flag: "🇰🇪", placeholder: "712 123456" },
    { code: "+971", name: "Emiratos Árabes Unidos", flag: "🇦🇪", placeholder: "50 123 4567" },
    { code: "+966", name: "Arabia Saudita", flag: "🇸🇦", placeholder: "50 123 4567" },
    { code: "+90", name: "Turquía", flag: "🇹🇷", placeholder: "501 234 56 78" },
    { code: "+7", name: "Rusia", flag: "🇷🇺", placeholder: "912 345-67-89" },
    { code: "+380", name: "Ucrania", flag: "🇺🇦", placeholder: "50 123 4567" },
    { code: "+48", name: "Polonia", flag: "🇵🇱", placeholder: "512 345 678" },
    { code: "+31", name: "Países Bajos", flag: "🇳🇱", placeholder: "6 12345678" },
    { code: "+32", name: "Bélgica", flag: "🇧🇪", placeholder: "470 12 34 56" },
    { code: "+41", name: "Suiza", flag: "🇨🇭", placeholder: "78 123 45 67" },
    { code: "+43", name: "Austria", flag: "🇦🇹", placeholder: "664 123456" },
    { code: "+45", name: "Dinamarca", flag: "🇩🇰", placeholder: "20 12 34 56" },
    { code: "+46", name: "Suecia", flag: "🇸🇪", placeholder: "70-123 45 67" },
    { code: "+47", name: "Noruega", flag: "🇳🇴", placeholder: "406 12 345" },
    { code: "+358", name: "Finlandia", flag: "🇫🇮", placeholder: "50 123 4567" },
    { code: "+65", name: "Singapur", flag: "🇸🇬", placeholder: "8123 4567" },
    { code: "+63", name: "Filipinas", flag: "🇵🇭", placeholder: "912 345 6789" },
    { code: "+62", name: "Indonesia", flag: "🇮🇩", placeholder: "0812 3456 789" },
    { code: "+60", name: "Malasia", flag: "🇲🇾", placeholder: "012-345 6789" },
    { code: "+66", name: "Tailandia", flag: "🇹🇭", placeholder: "081 234 5678" },
    { code: "+84", name: "Vietnam", flag: "🇻🇳", placeholder: "091 234 56 78" },
    { code: "+92", name: "Pakistán", flag: "🇵🇰", placeholder: "0300 1234567" },
    { code: "+98", name: "Irán", flag: "🇮🇷", placeholder: "0912 345 6789" },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰", placeholder: "071 123 4567" },
    { code: "+880", name: "Bangladés", flag: "🇧🇩", placeholder: "01712 345678" },
    { code: "+855", name: "Camboya", flag: "🇰🇭", placeholder: "092 123 456" },
    { code: "+673", name: "Brunéi", flag: "🇧🇳", placeholder: "872 1234" },
    { code: "+679", name: "Fiyi", flag: "🇫🇯", placeholder: "920 1234" },
    { code: "+675", name: "Papúa Nueva Guinea", flag: "🇵🇬", placeholder: "723 45678" },
    { code: "+677", name: "Islas Salomón", flag: "🇸🇧", placeholder: "742 1234" },
    { code: "+678", name: "Vanuatu", flag: "🇻🇺", placeholder: "778 1234" },
    { code: "+691", name: "Micronesia", flag: "🇫🇲", placeholder: "920 1234" },
    { code: "+692", name: "Islas Marshall", flag: "🇲🇭", placeholder: "692 1234" },
    { code: "+680", name: "Palaos", flag: "🇵🇼", placeholder: "620 1234" },
    { code: "+685", name: "Samoa", flag: "🇼🇸", placeholder: "722 1234" },
    { code: "+676", name: "Tonga", flag: "🇹🇴", placeholder: "771 1234" },
    { code: "+682", name: "Islas Cook", flag: "🇨🇰", placeholder: "722 1234" },
    { code: "+683", name: "Niue", flag: "🇳🇺", placeholder: "811 1234" },
    { code: "+672", name: "Isla Norfolk", flag: "🇳🇫", placeholder: "512 1234" },
    { code: "+670", name: "Timor Oriental", flag: "🇹🇱", placeholder: "771 1234" },
    { code: "+688", name: "Tuvalu", flag: "🇹🇻", placeholder: "771 1234" },
    { code: "+690", name: "Tokelau", flag: "🇹🇰", placeholder: "811 1234" },
    { code: "+239", name: "Santo Tomé y Príncipe", flag: "🇸🇹", placeholder: "981 1234" },
    { code: "+240", name: "Guinea Ecuatorial", flag: "🇬🇶", placeholder: "222 123 456" },
    { code: "+241", name: "Gabón", flag: "🇬🇦", placeholder: "06 12 34 56 78" },
    { code: "+242", name: "República del Congo", flag: "🇨🇬", placeholder: "06 123 4567" },
    { code: "+243", name: "República Democrática del Congo", flag: "🇨🇩", placeholder: "081 123 4567" },
    { code: "+244", name: "Angola", flag: "🇦🇴", placeholder: "923 123 456" },
    { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼", placeholder: "955 123 456" },
    { code: "+246", name: "Diego García", flag: "🇮🇴", placeholder: "380 1234" },
    { code: "+247", name: "Isla Ascensión", flag: "🇦🇨", placeholder: "650 1234" },
    { code: "+248", name: "Seychelles", flag: "🇸🇨", placeholder: "2 510 123" },
    { code: "+249", name: "Sudán", flag: "🇸🇩", placeholder: "091 123 4567" },
    { code: "+250", name: "Ruanda", flag: "🇷🇼", placeholder: "072 123 4567" },
    { code: "+251", name: "Etiopía", flag: "🇪🇹", placeholder: "091 123 4567" },
    { code: "+252", name: "Somalia", flag: "🇸🇴", placeholder: "61 123 4567" },
    { code: "+253", name: "Yibuti", flag: "🇩🇯", placeholder: "77 123 456" },
    { code: "+255", name: "Tanzania", flag: "🇹🇿", placeholder: "071 123 4567" },
    { code: "+256", name: "Uganda", flag: "🇺🇬", placeholder: "070 123 4567" },
    { code: "+257", name: "Burundi", flag: "🇧🇮", placeholder: "79 123 456" },
    { code: "+258", name: "Mozambique", flag: "🇲🇿", placeholder: "82 123 4567" },
    { code: "+260", name: "Zambia", flag: "🇿🇲", placeholder: "095 123 4567" },
    { code: "+261", name: "Madagascar", flag: "🇲🇬", placeholder: "032 12 345 67" },
    { code: "+262", name: "Reunión", flag: "🇷🇪", placeholder: "0692 12 34 56" },
    { code: "+263", name: "Zimbabue", flag: "🇿🇼", placeholder: "071 123 456" },
    { code: "+264", name: "Namibia", flag: "🇳🇦", placeholder: "081 123 4567" },
    { code: "+265", name: "Malaui", flag: "🇲🇼", placeholder: "099 123 4567" },
    { code: "+266", name: "Lesoto", flag: "🇱🇸", placeholder: "501 123 456" },
    { code: "+267", name: "Botsuana", flag: "🇧🇼", placeholder: "71 123 456" },
    { code: "+268", name: "Esuatini", flag: "🇸🇿", placeholder: "761 123 456" },
    { code: "+269", name: "Comoras", flag: "🇰🇲", placeholder: "321 1234" },
    { code: "+290", name: "Santa Elena", flag: "🇸🇭", placeholder: "659 1234" },
    { code: "+291", name: "Eritrea", flag: "🇪🇷", placeholder: "07 123 456" },
    { code: "+297", name: "Aruba", flag: "🇦🇼", placeholder: "560 1234" },
    { code: "+298", name: "Islas Feroe", flag: "🇫🇴", placeholder: "211234" },
    { code: "+299", name: "Groenlandia", flag: "🇬🇱", placeholder: "221234" },
    { code: "+350", name: "Gibraltar", flag: "🇬🇮", placeholder: "571 12345" },
    { code: "+352", name: "Luxemburgo", flag: "🇱🇺", placeholder: "621 123 456" },
    { code: "+353", name: "Irlanda", flag: "🇮🇪", placeholder: "083 123 4567" },
    { code: "+354", name: "Islandia", flag: "🇮🇸", placeholder: "611 1234" },
    { code: "+355", name: "Albania", flag: "🇦🇱", placeholder: "067 123 4567" },
    { code: "+356", name: "Malta", flag: "🇲🇹", placeholder: "799 12345" },
    { code: "+357", name: "Chipre", flag: "🇨🇾", placeholder: "961 12345" },
    { code: "+359", name: "Bulgaria", flag: "🇧🇬", placeholder: "088 123 4567" },
    { code: "+370", name: "Lituania", flag: "🇱🇹", placeholder: "601 12345" },
    { code: "+371", name: "Letonia", flag: "🇱🇻", placeholder: "200 12345" },
    { code: "+372", name: "Estonia", flag: "🇪🇪", placeholder: "501 1234" },
    { code: "+373", name: "Moldavia", flag: "🇲🇩", placeholder: "068 123 456" },
    { code: "+374", name: "Armenia", flag: "🇦🇲", placeholder: "091 123 456" },
    { code: "+375", name: "Bielorrusia", flag: "🇧🇾", placeholder: "029 123 4567" },
    { code: "+376", name: "Andorra", flag: "🇦🇩", placeholder: "606 123 456" },
    { code: "+377", name: "Mónaco", flag: "🇲🇨", placeholder: "06 12 34 56 78" },
    { code: "+378", name: "San Marino", flag: "🇸🇲", placeholder: "333 123456" },
    { code: "+379", name: "Ciudad del Vaticano", flag: "🇻🇦", placeholder: "333 123456" },
    { code: "+381", name: "Serbia", flag: "🇷🇸", placeholder: "061 123 4567" },
    { code: "+382", name: "Montenegro", flag: "🇲🇪", placeholder: "067 123 456" },
    { code: "+383", name: "Kosovo", flag: "🇽🇰", placeholder: "049 123 456" },
    { code: "+385", name: "Croacia", flag: "🇭🇷", placeholder: "091 123 4567" },
    { code: "+386", name: "Eslovenia", flag: "🇸🇮", placeholder: "031 123 456" },
    { code: "+387", name: "Bosnia y Herzegovina", flag: "🇧🇦", placeholder: "061 123 456" },
    { code: "+389", name: "Macedonia del Norte", flag: "🇲🇰", placeholder: "070 123 456" },
    { code: "+420", name: "República Checa", flag: "🇨🇿", placeholder: "601 123 456" },
    { code: "+421", name: "Eslovaquia", flag: "🇸🇰", placeholder: "0911 123 456" },
    { code: "+423", name: "Liechtenstein", flag: "🇱🇮", placeholder: "660 123 456" },
    { code: "+500", name: "Islas Malvinas", flag: "🇫🇰", placeholder: "51234" },
    { code: "+501", name: "Belice", flag: "🇧🇿", placeholder: "622 1234" },
    { code: "+502", name: "Guatemala", flag: "🇬🇹", placeholder: "5512 3456" },
    { code: "+503", name: "El Salvador", flag: "🇸🇻", placeholder: "7012 3456" },
    { code: "+504", name: "Honduras", flag: "🇭🇳", placeholder: "9123 4567" },
    { code: "+505", name: "Nicaragua", flag: "🇳🇮", placeholder: "8712 3456" },
    { code: "+506", name: "Costa Rica", flag: "🇨🇷", placeholder: "8312 3456" },
    { code: "+507", name: "Panamá", flag: "🇵🇦", placeholder: "6712 3456" },
    { code: "+508", name: "San Pedro y Miquelón", flag: "🇵🇲", placeholder: "551 1234" },
    { code: "+509", name: "Haití", flag: "🇭🇹", placeholder: "3412 3456" },
    { code: "+590", name: "Guadalupe", flag: "🇬🇵", placeholder: "0690 12 34 56" },
    { code: "+592", name: "Guyana", flag: "🇬🇾", placeholder: "612 3456" },
    { code: "+594", name: "Guayana Francesa", flag: "🇬🇫", placeholder: "0694 12 34 56" },
    { code: "+596", name: "Martinica", flag: "🇲🇶", placeholder: "0696 12 34 56" },
    { code: "+597", name: "Surinam", flag: "🇸🇷", placeholder: "741 1234" },
    { code: "+599", name: "Curazao", flag: "🇨🇼", placeholder: "9 561 1234" },
    { code: "+674", name: "Nauru", flag: "🇳🇷", placeholder: "555 1234" },
    { code: "+681", name: "Wallis y Futuna", flag: "🇼🇫", placeholder: "721 1234" },
    { code: "+686", name: "Kiribati", flag: "🇰🇮", placeholder: "720 1234" },
    { code: "+687", name: "Nueva Caledonia", flag: "🇳🇨", placeholder: "750 1234" },
    { code: "+689", name: "Polinesia Francesa", flag: "🇵🇫", placeholder: "87 12 34 56" },
    { code: "+850", name: "Corea del Norte", flag: "🇰🇵", placeholder: "191 123 4567" },
    { code: "+852", name: "Hong Kong", flag: "🇭🇰", placeholder: "6123 4567" },
    { code: "+853", name: "Macao", flag: "🇲🇴", placeholder: "6612 3456" },
    { code: "+856", name: "Laos", flag: "🇱🇦", placeholder: "020 1234 5678" },
    { code: "+886", name: "Taiwán", flag: "🇹🇼", placeholder: "0912 345 678" },
    { code: "+960", name: "Maldivas", flag: "🇲🇻", placeholder: "777 1234" },
    { code: "+961", name: "Líbano", flag: "🇱🇧", placeholder: "03 123 456" },
    { code: "+962", name: "Jordania", flag: "🇯🇴", placeholder: "079 123 4567" },
    { code: "+963", name: "Siria", flag: "🇸🇾", placeholder: "093 123 456" },
    { code: "+964", name: "Irak", flag: "🇮🇶", placeholder: "0790 123 4567" },
    { code: "+965", name: "Kuwait", flag: "🇰🇼", placeholder: "600 12345" },
    { code: "+967", name: "Yemen", flag: "🇾🇪", placeholder: "711 123 456" },
    { code: "+968", name: "Omán", flag: "🇴🇲", placeholder: "921 12345" },
    { code: "+970", name: "Palestina", flag: "🇵🇸", placeholder: "0599 123 456" },
    { code: "+972", name: "Israel", flag: "🇮🇱", placeholder: "052-123-4567" },
    { code: "+973", name: "Baréin", flag: "🇧🇭", placeholder: "3600 1234" },
    { code: "+974", name: "Catar", flag: "🇶🇦", placeholder: "3312 3456" },
    { code: "+975", name: "Bután", flag: "🇧🇹", placeholder: "17 123 456" },
    { code: "+976", name: "Mongolia", flag: "🇲🇳", placeholder: "8812 3456" },
    { code: "+977", name: "Nepal", flag: "🇳🇵", placeholder: "984 123 4567" },
    { code: "+992", name: "Tayikistán", flag: "🇹🇯", placeholder: "917 123 456" },
    { code: "+993", name: "Turkmenistán", flag: "🇹🇲", placeholder: "66 123 4567" },
    { code: "+994", name: "Azerbaiyán", flag: "🇦🇿", placeholder: "050 123 45 67" },
    { code: "+995", name: "Georgia", flag: "🇬🇪", placeholder: "555 12 34 56" },
    { code: "+996", name: "Kirguistán", flag: "🇰🇬", placeholder: "0700 123 456" },
    { code: "+998", name: "Uzbekistán", flag: "🇺🇿", placeholder: "90 123 45 67" },
  ]

 const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) || country.code.includes(countrySearch),
  )

  // Geolocation hook
  const { city, loading: geoLoading, error: geoError } = useGeolocation()

  // Matrix effect codes
  const matrixCodes = [
    "4bda7c",
    "x1f801",
    "uSr9ub",
    "r31sw",
    "3cqvt",
    "ebwvi",
    "4qd1tu",
    "str5y4",
    "ect2So",
    "xfnpBj",
    "kqjJu",
    "2v46yn",
    "q619ma",
    "wdtqdo",
    "14mkee",
    "pbb3eu",
    "vbncg8",
    "begaSh",
    "7rq",
    "dcboeu",
    "keyxs",
    "3Qehu",
    "N8135s",
    "nx794n",
    "11aqSi",
    "zBcpp",
    "s1xcBm",
    "u91xnm",
    "1s7mec",
    "Y8fmf",
    "11masu",
    "ye1f2t",
  ]

  // Progress steps for global progress bar
  const getProgressSteps = () => {
    const steps = [
      {
        id: "form",
        label: "Config",
        fullLabel: "Configuración",
        mobileLabel: "Config",
        completed: ["form", "verification", "preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "verification",
        label: "Verif",
        fullLabel: "Verificación",
        mobileLabel: "Verif",
        completed: ["verification", "preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "preliminary",
        label: "Result",
        fullLabel: "Resultado",
        mobileLabel: "Resultado",
        completed: ["preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "generating",
        label: "Informe",
        fullLabel: "Informe",
        mobileLabel: "Informe",
        completed: ["generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "offer",
        label: "Desbl",
        fullLabel: "Desbloquear",
        mobileLabel: "Acceso",
        completed: currentStep === "offer",
      },
    ]
    return steps
  }

  // Timer countdown
  useEffect(() => {
    if (currentStep === "result" || currentStep === "offer") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentStep])

  // Verification progress with dynamic messages
  useEffect(() => {
    if (currentStep === "verification") {
      const messages = [
        { progress: 0, message: "Verificando la actividad de Tinder en tu área..." },
        { progress: 15, message: "Cruzando datos de reconocimiento facial..." },
        { progress: 30, message: "Analizando patrones de inicio de sesión recientes..." },
        { progress: 45, message: "Escaneando Bumble, Hinge y otras plataformas..." },
        { progress: 60, message: "Detectando actividad de ubicación sospechosa..." },
        { progress: 75, message: "Compilando evidencia confidencial..." },
        { progress: 90, message: "Casi listo - finalizando tu informe..." },
        { progress: 100, message: "¡Investigación completada con éxito!" },
      ]

      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          const newProgress = prev + Math.random() * 8 + 2

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 25)
          if (currentMessage) {
            setVerificationMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => setCurrentStep("preliminary"), 1000)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  // Generating report progress (30 seconds) with geolocation integration
  useEffect(() => {
    if (currentStep === "generating") {
      const baseMessages = [
        { progress: 0, message: "Analizando fotos de perfil..." },
        { progress: 20, message: "Procesando historial de mensajes..." },
        { progress: 40, message: "Verificando las últimas ubicaciones accedidas..." },
        { progress: 60, message: "Recopilando datos de actividad..." },
        { progress: 80, message: "Cifrando información sensible..." },
        { progress: 95, message: "Finalizando el informe completo..." },
        { progress: 100, message: "¡Informe generado con éxito!" },
      ]

      // Add geolocation-specific message if city is available
      const messages = city
        ? [
            ...baseMessages.slice(0, 2),
            { progress: 30, message: `Analizando actividades recientes en la región de ${city}...` },
            ...baseMessages.slice(2),
          ]
        : baseMessages

      const interval = setInterval(() => {
        setGeneratingProgress((prev) => {
          const newProgress = prev + 100 / 75

          if (newProgress >= 33 && !stepCompleted.profilePhotos) {
            setStepCompleted((prev) => ({ ...prev, profilePhotos: true }))
          }
          if (newProgress >= 66 && !stepCompleted.conversations) {
            setStepCompleted((prev) => ({ ...prev, conversations: true }))
          }
          if (newProgress >= 90 && !stepCompleted.finalizing) {
            setStepCompleted((prev) => ({ ...prev, finalizing: true }))
          }

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 20)
          if (currentMessage) {
            setGeneratingMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => {
              if (stepCompleted.profilePhotos && stepCompleted.conversations && stepCompleted.finalizing) {
                setCurrentStep("result")
              }
            }, 1500)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep, city, stepCompleted])

  // Updated sales proof effect - now includes generating step
  useEffect(() => {
    if (currentStep === "generating" || currentStep === "result" || currentStep === "offer") {
      const showProof = () => {
        if (Math.random() < 0.7) {
          setShowSalesProof(true)
          setTimeout(() => setShowSalesProof(false), 6000)
        }
      }

      const initialTimeout = setTimeout(showProof, 5000)
      const interval = setInterval(showProof, 25000)

      return () => {
        clearTimeout(initialTimeout)
        clearInterval(interval)
      }
    }
  }, [currentStep])

  const fetchWhatsAppPhoto = async (phone: string) => {
    if (phone.length < 10) return

    setIsLoadingPhoto(true)
    setPhotoError("")

    try {
      const response = await fetch("/api/whatsapp-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone }),
      })

      // --- NEW robust handling (replaces old !response.ok throw) ---
      let data: any = null

      try {
        data = await response.json()
      } catch {
        // if the body is not valid JSON we still want to fall back safely
        data = {}
      }

      // When the API answers with non-200 we still carry on with a safe payload
      if (!response.ok || !data?.success) {
        setProfilePhoto(
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        )
        setIsPhotoPrivate(true)
        setPhotoError("No se pudo cargar la foto")
        return
      }

      // ✅ Successful, public photo
      setProfilePhoto(data.result)
      setIsPhotoPrivate(!!data.is_photo_private)
    } catch (error) {
      console.error("Error al buscar la foto:", error)
      setProfilePhoto(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      )
      setIsPhotoPrivate(true)
      setPhotoError("Error al cargar la foto")
    } finally {
      setIsLoadingPhoto(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    // Ensure the value starts with the selected country code
    let formattedValue = value
    if (!value.startsWith(selectedCountry.code)) {
      // If user is typing a number without country code, prepend it
      if (value && !value.startsWith("+")) {
        formattedValue = selectedCountry.code + " " + value
      } else if (value.startsWith("+") && !value.startsWith(selectedCountry.code)) {
        // User typed a different country code, keep it as is
        formattedValue = value
      } else {
        formattedValue = selectedCountry.code + " " + value.replace(selectedCountry.code, "").trim()
      }
    }

    setPhoneNumber(formattedValue)

    // Extract just the numbers for API call
    const cleanPhone = formattedValue.replace(/[^0-9]/g, "")
    if (cleanPhone.length >= 10) {
      fetchWhatsAppPhoto(cleanPhone)
    } else {
      setProfilePhoto(null)
      setIsPhotoPrivate(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        const target = event.target as Element
        if (!target.closest(".relative")) {
          setShowCountryDropdown(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCountryDropdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
    // Updated blocked images with new chat screenshots
  const blockedImages = [
    "https://i.ibb.co/PZmmjcxb/CHAT1.png",
    "https://i.ibb.co/20581vtC/CHAT2.png",
    "https://i.ibb.co/LzFZdXXH/CHAT3.png",
    "https://i.ibb.co/kvWFRct/CHAT4.png",
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blockedImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blockedImages.length) % blockedImages.length)
  }

  // Desplazamiento automático del carrusel
  useEffect(() => {
    if (currentStep === "result") {
      const interval = setInterval(nextSlide, 4000)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const [shouldUseCustomPhotosNonBinary1824, setShouldUseCustomPhotosNonBinary1824] = useState(false)
  const [shouldUseCustomPhotosNonBinary2534, setShouldUseCustomPhotosNonBinary2534] = useState(false)
  const [shouldUseCustomPhotosNonBinary3544, setShouldUseCustomPhotosNonBinary3544] = useState(false)
  const [shouldUseCustomPhotosNonBinary4554, setShouldUseCustomPhotosNonBinary4554] = useState(false)
  const [shouldUseCustomPhotos1824, setShouldUseCustomPhotos1824] = useState(false)
  const [shouldUseCustomPhotos2534, setShouldUseCustomPhotos2534] = useState(false)
  const [shouldUseCustomPhotos3544, setShouldUseCustomPhotos3544] = useState(false)
  const [shouldUseCustomPhotos4554, setShouldUseCustomPhotos4554] = useState(false)
  const [shouldUseCustomPhotosMale1824, setShouldUseCustomPhotosMale1824] = useState(false)
  const [shouldUseCustomPhotosMale2534, setShouldUseCustomPhotosMale2534] = useState(false)
  const [shouldUseCustomPhotosMale3544, setShouldUseCustomPhotosMale3544] = useState(false)
  const [shouldUseCustomPhotosMale4554, setShouldUseCustomPhotosMale4554] = useState(false)

  const [shuffledPhotoIndices1824, setShuffledPhotoIndices1824] = useState<number[]>([])
  const [shuffledPhotoIndices2534, setShuffledPhotoIndices2534] = useState<number[]>([])
  const [shuffledPhotoIndices3544, setShuffledPhotoIndices3544] = useState<number[]>([])
  const [shuffledPhotoIndices4554, setShuffledPhotoIndices4554] = useState<number[]>([])
  const [shuffledPhotoIndicesMale1824, setShuffledPhotoIndicesMale1824] = useState<number[]>([])
  const [shuffledPhotoIndicesMale2534, setShuffledPhotoIndicesMale2534] = useState<number[]>([])
  const [shuffledPhotoIndicesMale3544, setShuffledPhotoIndicesMale3544] = useState<number[]>([])
  const [shuffledPhotoIndicesMale4554, setShuffledPhotoIndicesMale4554] = useState<number[]>([])

  const [combinedPhotos1824, setCombinedPhotos1824] = useState<string[]>([])
  const [combinedPhotos2534, setCombinedPhotos2534] = useState<string[]>([])
  const [combinedPhotos3544, setCombinedPhotos3544] = useState<string[]>([])
  const [combinedPhotos4554, setCombinedPhotos4554] = useState<string[]>([])

          const generateFakeProfiles = useCallback(() => {
    const profiles: any[] = []
    const usedNames: string[] = []
    const usedImages: string[] = []

    const getUniqueItem = (sourceArray: string[], usedArray: string[]) => {
      if (!sourceArray || sourceArray.length === 0) return "/placeholder.svg";
      const availableItems = sourceArray.filter(item => !usedArray.includes(item));
      if (availableItems.length === 0) {
        return sourceArray[Math.floor(Math.random() * sourceArray.length)];
      }
      const selectedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
      usedArray.push(selectedItem);
      return selectedItem;
    }
    
    let matchLocation = "";
    if (city) {
        matchLocation = city;
    } else {
        const defaultGlobalLocations = ["Nueva York", "Los Ángeles", "Chicago", "Londres"];
        matchLocation = defaultGlobalLocations[Math.floor(Math.random() * defaultGlobalLocations.length)];
    }

    const sampleBios = [
      "Soy lo que obtienes si mezclas a un comediante con un actor de drama. Soy gracioso sin querer y mi mamá piensa que soy guapo.",
      "Amante de la aventura, el café y los perros. ¡Buscando a alguien con quien explorar la ciudad!",
      "Entusiasta del fitness de día, maratonista de Netflix de noche. Tomemos un batido y hablemos de la vida.",
      "Artista, soñador y filósofo a tiempo parcial. Creo en las buenas vibras y las grandes conversaciones.",
      "Mitad comediante, mitad adicto al sofá. Yo pongo las risas, tú pones los snacks, ¿trato hecho?",
      "Explorador de lugares nuevos y pizzerías antiguas. Encontremos la mejor porción de la ciudad.",
      "Fanático del gimnasio por la mañana, entusiasta de los tacos por la noche. ¿Te apuntas a alguna de las dos?",
      "Soñador con una lista de reproducción para cada estado de ánimo. Comparte tu canción favorita y conectemos.",
      "50% aventura, 50% Netflix. Buscando a alguien que me equilibre.",
      "Amante de los atardeceres, el sarcasmo y los viajes espontáneos. ¿Tienes algún destino en mente?",
      "Creo en el buen café, las grandes conversaciones y en acariciar a cada perro que veo.",
      "Filósofo a tiempo parcial, experto en snacks a tiempo completo. Debatamos sobre los ingredientes de la pizza.",
      "Siempre persiguiendo amaneceres y buenas historias. ¿Tienes una para compartir?",
      "Mi vida es una mezcla de caos y tranquilidad. ¿Te unes a la parte tranquila?",
      "Amante de la comida, viajero y pensador ocasional. Vayamos a comer algo y resolvamos los misterios de la vida.",
      "Soy 10% de charla ingeniosa y 90% tratando de mantener vivas mis plantas. ¿Me ayudas?",
      "Adicto a la música y observador de estrellas. Busquemos un lugar para mirar el cielo y conversar.",
      "Yo pongo los chistes malos, tú pones los ojos en blanco. La pareja perfecta, ¿verdad?",
      "Amante de los libros, las playas y los burritos. Escribamos nuestra propia historia.",
      "Mitad adicto a la adrenalina, mitad entusiasta de las mantas acogedoras. ¿Cuál es tu rollo?",
      "Siempre listo para una caminata o una visita a un restaurante de madrugada. ¡Elige tu aventura!",
      "Soy el amigo que siempre llega tarde pero trae las mejores listas de reproducción. ¿Quieres escuchar música?",
      "La vida es demasiado corta para un mal café o charlas aburridas. Hagamos que ambos sean épicos.",
      "Parte soñador, parte hacedor, todo sobre buenas vibras. ¿Listo/a para crear algunos recuerdos?"
];
    const personalityTags = [
      ["Capricornio", "INTJ", "Gato"],
      ["Leo", "ENFP", "Perro"],
      ["Virgo", "ISFJ", "Café"],
      ["Géminis", "ENTP", "Viajar"],
      ["Aries", "ESTP", "Aventura"],
      ["Tauro", "INFJ", "Libros"],
      ["Escorpio", "INTP", "Música"],
      ["Libra", "ESFJ", "Arte"],
      ["Acuario", "ENFJ", "Astronomía"],
      ["Piscis", "INFP", "Sueños"],
      ["Cáncer", "ISFP", "Playa"],
      ["Sagitario", "ENTJ", "Senderismo"],
      ["Capricornio", "ISTJ", "Cocina"],
      ["Leo", "ESFP", "Bailar"],
      ["Virgo", "ISTP", "Videojuegos"],
      ["Géminis", "ENFP", "Fotografía"],
      ["Aries", "ESTJ", "Deportes"],
      ["Tauro", "INFP", "Naturaleza"],
      ["Escorpio", "INTJ", "Misterio"],
      ["Libra", "ENFJ", "Moda"],
      ["Acuario", "ENTP", "Tecnología"],
      ["Piscis", "ISFJ", "Cine"],
      ["Cáncer", "INFJ", "Poesía"],
      ["Sagitario", "ESFP", "Fiestas"]
];
    const interestTags = [
      ["Pro-elección", "Café", "Black Lives Matter", "Tatuajes"],
      ["Yoga", "Sostenibilidad", "Fotografía", "Cocina"],
      ["Fitness", "Meditación", "Libros", "Vino"],
      ["Viajar", "Música", "Derechos de los animales", "Senderismo"],
      ["Arte", "Veganismo", "Cine", "Aventura"],
      ["Videojuegos", "Tecnología", "Naturaleza", "Manualidades"],
      ["Bailar", "Justicia social", "Podcasts", "Repostería"],
      ["Moda", "Ecologismo", "Poesía", "Acampar"],
      ["Deportes", "Salud mental", "Jardinería", "Discos de vinilo"],
      ["Escritura", "Acción climática", "Teatro", "Cafeterías"],
      ["Correr", "Voluntariado", "Juegos de mesa", "Comida callejera"],
      ["Pintura", "Derechos LGBTQ+", "Conciertos", "Tiendas de segunda mano"],
      ["Ciclismo", "Mindfulness", "Ciencia ficción", "Cervecerías"],
      ["Esquí", "Activismo", "Documentales", "Atardeceres"],
      ["Surf", "Exploración urbana", "Cómics", "Cerveza artesanal"],
      ["Escalada", "Igualdad", "Música jazz", "Autos antiguos"],
      ["Skateboarding", "Moda sostenible", "Podcasts", "Food trucks"],
      ["Kayak", "Bienestar animal", "Libros de fantasía", "Astronomía"],
      ["Boxeo", "Servicio comunitario", "Cine independiente", "Sushi"],
      ["Senderismo", "Vida ecológica", "Música en vivo", "Cerámica"],
      ["Natación", "Feminismo", "Historia", "Barbacoa"],
      ["Fotografía", "Minimalismo", "Crimen real", "Viajes por carretera"],
      ["Bailar", "Obras de caridad", "Animación", "Cócteles"],
      ["Cantar", "Conservación del océano", "Novelas de misterio", "Picnics"]
];
    const orientations = ["Heterosexual", "Bisexual", "Pansexual", "Queer"];

    for (let i = 0; i < 3; i++) {
      let profileGender: 'masculino' | 'feminino';
      let profileAgeRange: keyof typeof maleNames;
      
      if (selectedGender === "nao-binario") {
        // --- INÍCIO: LÓGICA CORRIGIDA PARA GARANTIR CONSISTÊNCIA ---
        
        // 1. Sorteia o GÊNERO para este perfil específico (homem ou mulher)
        profileGender = Math.random() < 0.5 ? "masculino" : "feminino";
        
        // 2. Sorteia a FAIXA ETÁRIA para este perfil específico
        const ageRanges: (keyof typeof maleNames)[] = ["18-24", "25-34", "35-44", "45-54"];
        profileAgeRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
        // --- FIM: LÓGICA CORRIGIDA ---

      } else {
        // Lógica original para masculino/feminino (mostra o gênero oposto)
        profileGender = selectedGender === "masculino" ? "feminino" : "masculino";
        profileAgeRange = ageRange as keyof typeof maleNames;
      }

      let names: string[];
      let photoArray: string[];

      // 3. AGORA, com o gênero e idade definidos, pega os nomes e fotos corretos
      if (profileGender === 'masculino') {
        names = maleNames[profileAgeRange] || [];
        switch (profileAgeRange) {
          case "18-24": photoArray = malePhotos1824; break;
          case "25-34": photoArray = malePhotos2534; break;
          case "35-44": photoArray = malePhotos3544; break;
          case "45-54": photoArray = malePhotos4554; break;
          default: photoArray = malePhotos2534;
        }
      } else { // feminino
        names = femaleNames[profileAgeRange] || [];
        switch (profileAgeRange) {
          case "18-24": photoArray = femalePhotos1824; break;
          case "25-34": photoArray = femalePhotos2534; break;
          case "35-44": photoArray = femalePhotos3544; break;
          case "45-54": photoArray = femalePhotos4554; break;
          default: photoArray = femalePhotos2534;
        }
      }
      
      const name = getUniqueItem(names, usedNames);
      const profileImage = getUniqueItem(photoArray, usedImages);
      const age = Math.floor(Math.random() * 7) + (parseInt(profileAgeRange.split("-")[0]) || 25);

      profiles.push({
        name,
        age,
        lastSeen: `hace ${Math.floor(Math.random() * 24)} h`,
        description: "Usuario activo, frecuentemente en línea",
        image: profileImage,
        bio: sampleBios[Math.floor(Math.random() * sampleBios.length)],
        location: `Vive en ${matchLocation}`,
        distance: `${Math.floor(Math.random() * 15) + 1} km de distancia`,
        orientation: orientations[Math.floor(Math.random() * orientations.length)],
        personality: personalityTags[Math.floor(Math.random() * personalityTags.length)],
        interests: interestTags[Math.floor(Math.random() * interestTags.length)],
        verified: Math.random() > 0.5,
      });
    }

    setGeneratedProfiles(profiles);
    return profiles;
  }, [
    selectedGender,
    ageRange,
    city,
    // As dependências continuam corretas
    femalePhotos1824,
    femalePhotos2534,
    femalePhotos3544,
    femalePhotos4554,
    malePhotos1824,
    malePhotos2534,
    malePhotos3544,
    malePhotos4554,
  ]);

  const openProfileModal = (profile: any) => {
    setSelectedProfile(profile)
    setIsProfileModalOpen(true)
  }

  const closeProfileModal = () => {
    setIsProfileModalOpen(false)
    setSelectedProfile(null)
  }

  useEffect(() => {
    if (currentStep === "result") {
      generateFakeProfiles()
    }
  }, [currentStep, generateFakeProfiles])

  const canVerify =
    phoneNumber.length >= 10 &&
    selectedGender &&
    profilePhoto &&
    lastTinderUse &&
    cityChange &&
    ageRange &&
    userEmail.includes("@")
      // Function to submit email and proceed to verification
  const handleSubmitForm = async () => {
    if (!canVerify) return

    setIsSubmittingEmail(true)
    try {
      await fetch(
        "https://get.flwg.cc/webhook/39cdbbc69e8d1ca779759e12cef3319bf3c502a4df696a3493a1c8824ec1eb11",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tag: "tinder check es - usuario criado",
            evento: "Usuário Criado",
            email: userEmail,
            phone: phoneNumber,
          }),
        },
      )
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error)
    } finally {
      setIsSubmittingEmail(false)
      setCurrentStep("verification")
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Barra de Progreso Global - Optimizada para Móviles */}
      {currentStep !== "landing" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="stepper-container overflow-x-auto px-3 py-3">
            <div className="flex items-center gap-2 min-w-max">
              {getProgressSteps().map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="stepper-step flex items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                        step.completed
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.completed ? "✓" : index + 1}
                    </div>
                    <span
                      className={`font-medium transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap ${
                        step.completed
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="block sm:hidden">{step.mobileLabel}</span>
                      <span className="hidden sm:block">{step.fullLabel}</span>
                    </span>
                  </div>
                  {index < getProgressSteps().length - 1 && (
                    <div className="w-6 sm:w-8 h-px bg-gray-300 mx-2 sm:mx-3 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popup de Prueba de Ventas - Prueba Social Dinámica */}
      <AnimatePresence>
        {showSalesProof && (currentStep === "generating" || currentStep === "result" || currentStep === "offer") && (
          <SalesProofPopup show={showSalesProof} onClose={() => setShowSalesProof(false)} />
        )}
      </AnimatePresence>

      <div className={currentStep !== "landing" ? "pt-16 sm:pt-20" : ""}>
        <AnimatePresence mode="wait">
          {/* Página de Inicio - Optimizada para Móviles */}
          {currentStep === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] relative overflow-hidden"
            >
              {/* Fondo Matrix - Reducido para rendimiento móvil */}
              <div className="absolute inset-0 opacity-10 sm:opacity-20">
                {matrixCodes.slice(0, 15).map((code, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-green-400 text-xs font-mono"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  >
                    {code}
                  </motion.div>
                ))}
              </div>

              {/* Contenido */}
              <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
                {/* Encabezado */}
                <div className="text-center mb-12 sm:mb-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FF0066] to-[#FF3333] rounded-2xl mb-6 sm:mb-8 shadow-2xl"
                  >
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 px-2 leading-tight"
                  >
                    Esa Corazonada no Desaparece...
                    <br />
                    <span className="text-[#FF3B30] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold">
                      Y Tienes Razón en Confiar en Ella
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#CCCCCC] mb-6 text-base sm:text-lg md:text-xl px-4 max-w-3xl mx-auto font-medium"
                  >
                    Deja de perder el sueño preguntándote si todavía está deslizando. Obtén las respuestas que necesitas, de forma completamente anónima.
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 bg-green-600/20 text-green-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm mt-4 border border-green-500/30"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">Sistema de Detección Avanzado - Actualizado en Junio de 2025</span>
                  </motion.div>
                </div>

                {/* Características - Optimizadas para Móviles */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Ve su última conexión (incluso cuando dice que 'ya no usa' las apps)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Descubre desde dónde está deslizando realmente
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Accede a las conversaciones que no quiere que veas
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Tu investigación se mantiene completamente privada
                    </span>
                  </div>
                </motion.div>

                {/* Llamada a la Acción - Optimizada para Móviles con Texto de Botón Fijo */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-center mb-12 sm:mb-16 px-4"
                >
                  <Button
                    onClick={() => setCurrentStep("form")}
                    className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base md:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full max-w-md mx-auto flex items-center justify-center text-center overflow-hidden"
                  >
                    <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                      🔍 OBTÉN LA VERDAD – INICIAR BÚSQUEDA ANÓNIMA
                    </span>
                  </Button>

                  <p className="text-sm text-gray-300 mt-4 font-medium">
                    Investigación 100% anónima. Nunca sabrá que lo comprobaste.
                  </p>
                </motion.div>
              </div>

              {/* Sección Inferior - Optimizada para Móviles */}
              <div className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-4">
                      No Estás Paranoico/a -
                    </h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] to-[#FF3333] mb-6">
                      Te Estás Protegiendo
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                      Deja de dudar de tus instintos. Obtén la claridad que necesitas para tomar decisiones informadas sobre tu relación.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">ACTIVIDAD RECIENTE</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Ve cuándo usó las apps de citas por última vez</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">UBICACIÓN EXACTA</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Desde dónde ha estado deslizando</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">FOTOS OCULTAS</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Las fotos que no quiere que veas</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">CONVERSACIONES PRIVADAS</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Lo que realmente está diciendo a otros</p>
                    </div>
                  </div>

                  {/* Sección de Testimonios - Mejorada con enfoque en la validación */}
                  <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#333333] mb-6 sm:mb-8 px-2">
                      No Estás Solo/a - Mira lo que Otros Descubrieron
                    </h3>

                    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 mb-6 sm:mb-8">
                      {/* Testimonio de Sofía */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Foto de Sofía"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Sofía, 32</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Usuaria Verificada</p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Sabía que algo no andaba bien. El informe confirmó mis peores temores, pero al menos ahora pude tomar una decisión informada en lugar de vivir en constante ansiedad.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>

                      {/* Testimonio de Valentina */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                          alt="Foto de Valentina"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Valentina, 28</p>
                            <p className="text-xs sm:text-sm text-blue-600 font-medium">
                              Investigación completada en Junio de 2025
                            </p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Los mejores $17 que he gastado. Me ahorró meses de dudas y me dio el cierre que necesitaba. Mis instintos estuvieron en lo correcto todo el tiempo.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                                            {/* Testimonio de Mónica */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                          alt="Foto de Mónica"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Mónica, 35</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Usuaria Verificada</p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Me sentía culpable por verificar, pero mis instintos tenían razón. Ahora puedo seguir adelante con confianza en lugar de vivir en la duda.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botón de CTA Único - Desbordamiento de Texto Corregido */}
                    <Button
                      onClick={() => setCurrentStep("form")}
                      className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-sm mx-auto flex items-center justify-center text-center overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔍 INICIAR MI INVESTIGACIÓN ANÓNIMA
                      </span>
                    </Button>
                  </div>

                  {/* Aviso de Privacidad Inferior */}
                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-2 font-medium">
                      <Shield className="w-4 h-4" />
                      100% anónimo - Tu investigación se mantiene completamente privada
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Formulario - Optimizado para Móviles */}
          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-[#6C63FF] relative overflow-hidden"
            >
              {/* Puntos flotantes - Reducidos para móviles */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-lg">
                  {/* Encabezado */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                      <Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-[#6C63FF]" />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                      🔍 Ayúdanos a Encontrar lo que Esconden
                    </h1>
                    <p className="text-gray-200 text-sm sm:text-base px-4 leading-relaxed">
                      Cuantos más detalles proporciones, más a fondo podremos investigar. Todo se mantiene 100% anónimo.
                    </p>
                  </div>

                  {/* Formulario */}
                  <Card className="bg-white rounded-2xl shadow-lg border-0">
                    <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                      {/* Carga de Fotos - Movido a la primera posición */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Sube su Foto para Reconocimiento Facial
                        </label>
                        <div className="text-center">
                          {uploadedPhoto ? (
                            <div className="relative inline-block">
                              <img
                                src={uploadedPhoto || "/placeholder.svg"}
                                alt="Subida"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-blue-500 shadow-lg"
                              />
                              <button
                                onClick={() => setUploadedPhoto(null)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-3 font-medium">
                          Escanearemos todas las plataformas de citas para encontrar perfiles coincidentes, incluso los que creen que están ocultos.
                        </p>
                      </div>

                      {/* Número de Teléfono - Ahora segundo */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">
                          Número de WhatsApp que Utilizan
                        </label>
                        <div className="flex gap-2 sm:gap-3">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-gray-600 flex-shrink-0 font-medium text-sm sm:text-base flex items-center gap-2 hover:bg-gray-200 transition-colors duration-200 min-w-[80px] sm:min-w-[90px]"
                            >
                              <span className="text-lg">{selectedCountry.flag}</span>
                              <span>{selectedCountry.code}</span>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-lg z-50 w-80 max-h-60 overflow-y-auto">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Buscar país..."
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                  />
                                </div>
                                {filteredCountries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(country)
                                      setShowCountryDropdown(false)
                                      setCountrySearch("")
                                      // Update phone number with new country code
                                      const currentNumber = phoneNumber.replace(/^\+\d+\s*/, "")
                                      setPhoneNumber(country.code + " " + currentNumber)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                                  >
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="font-medium">{country.code}</span>
                                    <span className="text-gray-600">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <Input
                            type="tel"
                            placeholder={selectedCountry.placeholder}
                            value={phoneNumber}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Esto nos ayuda a rastrear la actividad de su dispositivo y cruzarla con los patrones de uso de las aplicaciones de citas.
                        </p>

                        {/* Vista Previa de la Foto de WhatsApp */}
                        {(profilePhoto || isLoadingPhoto) && (
                          <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3 sm:gap-4">
                              {isLoadingPhoto ? (
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-xl animate-pulse" />
                              ) : (
                                <img
                                  src={profilePhoto || "/placeholder.svg"}
                                  alt="Perfil de WhatsApp"
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-gray-200"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-[#333333] text-sm sm:text-base">
                                  Perfil de WhatsApp Encontrado
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {isPhotoPrivate ? "Foto privada detectada" : "Foto de perfil cargada"}
                                </p>
                              </div>
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Selección de Género */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          ¿Cuál es su género?
                        </label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {[
                            { value: "masculino", label: "Hombre", icon: "👨" },
                            { value: "feminino", label: "Mujer", icon: "👩" },
                            { value: "nao-binario", label: "No binario", icon: "🧑" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setSelectedGender(option.value)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                selectedGender === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-lg sm:text-xl mb-1 sm:mb-2">{option.icon}</div>
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                                            {/* Rango de Edad */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          ¿Qué Edad Tienen?
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {[
                            { value: "18-24", label: "18-24 años" },
                            { value: "25-34", label: "25-34 años" },
                            { value: "35-44", label: "35-44 años" },
                            { value: "45-54", label: "45+ años" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setAgeRange(option.value)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                ageRange === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Esto nos ayuda a acotar los parámetros de búsqueda en las plataformas de citas.
                        </p>
                      </div>

                      {/* Preguntas sobre la Línea de Tiempo */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          ¿Cuándo Empezaste a Sospechar?
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { value: "week", label: "En la última semana", desc: "(cambios de comportamiento recientes)" },
                            { value: "month", label: "El mes pasado", desc: "(distanciamiento gradual/ocultación del teléfono)" },
                            { value: "longer", label: "Más de un mes", desc: "(corazonada persistente)" },
                            { value: "sure", label: "Solo necesito estar seguro/a", desc: "" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setLastTinderUse(option.value)}
                              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                lastTinderUse === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              {option.desc && (
                                <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Preguntas sobre Ubicación */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          ¿Han Estado "Trabajando Hasta Tarde" o Viajando?
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { value: "yes", label: "Sí", desc: '"Nuevas exigencias laborales" o viajes sin explicación' },
                            { value: "no", label: "No", desc: "Los cambios de comportamiento ocurrieron en casa" },
                            { value: "unknown", label: "No lo sé", desc: "Son reservados con su horario" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setCityChange(option.value)}
                              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                cityChange === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Campo de Correo Electrónico - Añadido aquí */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">
                          Tu Dirección de Correo Electrónico
                        </label>
                        <Input
                          type="email"
                          placeholder="Ingresa tu dirección de correo electrónico"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Enviaremos tu informe completo a esta dirección de correo. 100% confidencial.
                        </p>
                      </div>

                      {/* Botón de Enviar - Desbordamiento de Texto Corregido */}
                      <Button
                        onClick={handleSubmitForm}
                        disabled={!canVerify || isSubmittingEmail}
                        className={`w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-xl transition-all duration-300 overflow-hidden ${
                          canVerify && !isSubmittingEmail
                            ? "bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <span className="block text-center leading-tight px-2">
                          {isSubmittingEmail ? "Procesando..." : "🔍 INICIAR INVESTIGACIÓN"}
                        </span>
                      </Button>

                      {/* Señal de Confianza */}
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                          <Lock className="w-4 h-4" />
                          Tus datos están encriptados y se eliminan automáticamente después de 24 horas
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Verificación - Optimizada para Móviles */}
          {currentStep === "verification" && (
            <motion.div
              key="verification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔍 Escaneando Todas las Plataformas de Citas...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={verificationProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{verificationMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Escaneando Tinder, Bumble, Hinge...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Procesando reconocimiento facial...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Análisis de datos de ubicación...</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Conexión segura y encriptada - No se dejan rastros
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
                    {/* Resultados Preliminares - Optimizado para Móviles */}
          {currentStep === "preliminary" && (
            <motion.div
              key="preliminary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-lg">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {/* Encabezado de Alerta */}
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-pulse">
                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-3 sm:mb-4">
                        Encontramos lo que Estabas Buscando...
                      </h2>
                    </div>

                    {/* Caja de Alerta */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-700">PERFILES DE CITAS ACTIVOS DETECTADOS</h3>
                      </div>
                      <p className="text-sm sm:text-base text-red-600 font-medium leading-relaxed">
                        Nuestro sistema descubrió múltiples perfiles activos vinculados a esta persona en 3 plataformas de citas diferentes.
                      </p>
                    </div>

                    {/* Hallazgos Clave */}
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Última Actividad: Hace 18 horas
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            A pesar de afirmar que 'borraron todo'...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            3 Aplicaciones de Citas Activas Actualmente
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">Tinder, Bumble y una plataforma prémium</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Conversaciones Recientes Detectadas
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Mensajería activa con múltiples 'matches' esta semana
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Caja del Siguiente Paso */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm font-bold">💡</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-blue-700">
                          Lo que Verás en el Informe Completo:
                        </h3>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-600">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Capturas de pantalla de todos los perfiles activos
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Conversaciones recientes y lo que están diciendo
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Ubicaciones exactas desde donde han estado deslizando
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Cronología de toda la actividad (te sorprenderás)
                        </li>
                      </ul>
                    </div>

                    {/* Botón de CTA - Desbordamiento de Texto Corregido */}
                    <Button
                      onClick={() => setCurrentStep("generating")}
                      className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden flex items-center justify-center text-center"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔓 DESBLOQUEAR EVIDENCIA COMPLETA
                      </span>
                    </Button>

                    {/* Reafirmación */}
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Anonimato completo garantizado - Nunca sabrán que lo comprobaste
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Generando Informe - Optimizado para Móviles */}
          {currentStep === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      📊 Generando Informe Completo...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={generatingProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{generatingMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.profilePhotos ? "bg-green-50" : "bg-blue-50"
                        }`}
                      >
                        {stepCompleted.profilePhotos ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Fotos de perfil analizadas</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.conversations
                            ? "bg-green-50"
                            : stepCompleted.profilePhotos
                              ? "bg-blue-50"
                              : "bg-gray-50"
                        }`}
                      >
                        {stepCompleted.conversations ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : stepCompleted.profilePhotos ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            stepCompleted.conversations || stepCompleted.profilePhotos
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          Procesando conversaciones...
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          stepCompleted.finalizing
                            ? "bg-green-50"
                            : stepCompleted.conversations
                              ? "bg-blue-50"
                              : "bg-gray-50"
                        }`}
                      >
                        {stepCompleted.finalizing ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : stepCompleted.conversations ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            stepCompleted.finalizing || stepCompleted.conversations ? "text-gray-700" : "text-gray-500"
                          }`}
                        >
                          Finalizando informe...
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Encriptando datos sensibles para tu privacidad
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Resultado - Optimizado para Móviles */}
          {currentStep === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8"
            >
              <div className="container mx-auto max-w-4xl">
                {(profilePhoto || uploadedPhoto) && (
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="relative">
                      <img
                        src={uploadedPhoto || profilePhoto || ""}
                        alt="Perfil"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {isPhotoPrivate && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Banners de Alerta */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">🚨 PERFIL ENCONTRADO - ESTÁN ACTIVOS EN TINDER</h3>
                        <p className="text-xs sm:text-sm opacity-90">Última vez: En línea ahora</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base">⚠️ ¡ATENCIÓN: PERFIL ACTIVO ENCONTRADO!</h3>
                        <p className="text-xs sm:text-sm opacity-90">
                          Confirmamos que este número está vinculado a un perfil ACTIVO de Tinder. Se detectaron registros de uso recientes en{" "}
                          {city || "tu área"}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de Estadísticas */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-red-500 mb-1">6</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">MATCHES (7 DÍAS)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">30</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">ME GUSTA (7 DÍAS)</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1">4</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">CHATS ACTIVOS</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">18h</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">ÚLTIMA ACTIVIDAD</div>
                  </div>
                </div>

                {/* Matches Recientes */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔥 MATCHES RECIENTES ENCONTRADOS
                    </h3>
                       <p className="text-sm text-gray-600 text-left mb-6">
    Toca un match para ver más información
  </p>
                    <div className="space-y-4">
                      {generatedProfiles.map((profile, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => openProfileModal(profile)}
                        >
                          <div className="relative">
                            {profile.image ? (
                              <img
                                src={profile.image || "/placeholder.svg"}
                                alt={profile.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
                                <User className="w-6 h-6 text-pink-600" />
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900">
                                {profile.name}, {profile.age}
                              </h4>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-sm text-gray-600">Última vez: {profile.lastSeen}</p>
                            <p className="text-sm text-green-600">Chat activo: frecuentemente en línea</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sección de Fotos */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">📸 FOTOS CENSURADAS</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Ve todas las fotos de su perfil (incluidas las que nunca has visto)
                    </p>
                                        {/* Carrusel */}
                    <div className="relative">
                      <div className="overflow-hidden rounded-xl">
                        <div
                          className="flex transition-transform duration-300 ease-in-out"
                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                          {blockedImages.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Conversación de chat ${index + 1}`}
                                className="w-full h-48 sm:h-64 object-cover"
                                style={{ filter: "blur(8px) brightness(0.7)" }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="text-center">
                                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-2 opacity-80" />
                                  <p className="text-white text-xs font-bold opacity-80">BLOQUEADO</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Controles del Carrusel */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Indicador de Puntos */}
                      <div className="flex justify-center gap-2 mt-4">
                        {blockedImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sección de Desbloqueo */}
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#333333] mb-3 sm:mb-4">
                        🔓 DESBLOQUEAR INFORME COMPLETO
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        Obtén acceso instantáneo al informe completo con fotos sin censura e historial de conversaciones completo.
                      </p>
                    </div>

                    {/* Tarjeta de Temporizador de Emergencia - Añadida antes del botón de pago */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                        <span className="font-bold text-lg sm:text-xl">EL INFORME SE ELIMINARÁ EN:</span>
                      </div>
                      <div className="text-center mb-3">
                        <div className="text-3xl sm:text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
                      </div>
                      <p className="text-sm sm:text-base text-center leading-relaxed opacity-90">
                        Después de que expire el tiempo, este informe se eliminará permanentemente por razones de privacidad. Esta oferta no se puede recuperar en una fecha posterior.
                      </p>
                    </div>

                    {/* Botón de Pago Directo - Usando la etiqueta <a> (Recomendado) */}
<a
  href="https://pay.mundpay.com/01992f4b-5dc3-7120-bf6f-9ddee0d7037c?ref="
  target="_blank"
  rel="noopener noreferrer"
  className="block w-full text-center bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden"
>
  <span className="block text-center leading-tight px-2"> 🔓 DESBLOQUEAR MI INFORME - ESTOY LISTO/A PARA LA VERDAD </span>
</a>

                    {/* Reafirmación Final */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <p className="text-sm sm:text-base text-blue-700 font-medium leading-relaxed">
                        No estás invadiendo la privacidad, estás protegiendo tu bienestar emocional. Tienes derecho a tomar decisiones informadas sobre tu relación.
                      </p>
                    </div>

                    {/* Testimonio */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Sara M."
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-sm sm:text-base">Sara M.</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Usuaria Verificada</p>
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">
                            "Ojalá hubiera hecho esto hace meses. Me habría ahorrado mucha ansiedad y tiempo perdido."
                          </p>
                          <div className="flex items-center text-[#FFD700] text-sm mt-2">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isProfileModalOpen && selectedProfile && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                      {/* Encabezado con botón de cerrar */}
                      <div className="relative">
                        <button
                          onClick={closeProfileModal}
                          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <X className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Imagen de Perfil */}
                        <div className="relative h-96 bg-gray-200 rounded-t-2xl overflow-hidden">
                          <img
                            src={selectedProfile.image || "/placeholder.svg"}
                            alt={selectedProfile.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Superposición de gradiente */}
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>

                          {/* Superposición de nombre e información básica */}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-3xl font-bold">{selectedProfile.name}</h2>
                              {selectedProfile.verified && (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm opacity-90">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{selectedProfile.orientation}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{selectedProfile.location}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{selectedProfile.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contenido del Perfil */}
                      <div className="p-6 space-y-6">
                        {/* Sección Sobre Mí */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">Sobre Mí</h3>
                          <p className="text-gray-700 leading-relaxed">{selectedProfile.bio}</p>
                        </div>

                        {/* Etiquetas de Personalidad */}
                        {selectedProfile.personality && (
                          <div>
                            <div className="flex flex-wrap gap-2">
                              {selectedProfile.personality.map((tag: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Sección Mis Intereses */}
                        {selectedProfile.interests && (
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Mis Intereses</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProfile.interests.map((interest: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Botones de Acción */}
                        <div className="flex gap-4 pt-4">
                          <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors">
                            Pasar
                          </button>
                          <button className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 hover:to-red-600 transition-colors">
                            Me gusta
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Página de Oferta */}
          {currentStep === "offer" && (
            <motion.div key="offer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8" >
              <div className="container mx-auto max-w-2xl">
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-6 sm:p-8 text-center">
                    {/* Encabezado */}
                    <div className="mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] mb-3 sm:mb-4"> Mereces Saber Toda la Verdad </h1>
                      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed"> Deja de preguntarte. Deja de perder el sueño. Obtén cada detalle - completamente confidencial. </p>
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-red-700 font-semibold leading-relaxed"> Tus instintos tenían razón. Ahora mira exactamente lo que han estado ocultando mientras te miraban a los ojos y mentían. </p>
                      </div>
                    </div>

                    {/* Sección de Precios */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="text-2xl sm:text-3xl text-gray-400 line-through">$47.00</div>
                        <div className="text-4xl sm:text-5xl font-bold text-[#FF0066]">$17.00</div>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4"> 🔥 62% DE DESCUENTO - TIEMPO LIMITADO </div>
                      <p className="text-sm sm:text-base text-gray-600 font-medium"> Pago único para acceso de por vida a tu informe completo </p>
                    </div>

                    {/* Lo que Desbloquearás */}
                    <div className="text-left mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6 text-center"> Lo que Desbloquearás: </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium"> Cada Foto de Perfil (incluidas las que creen que nunca verás) </span>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium"> Historial Completo de Conversaciones (mira exactamente lo que le dicen a otras personas) </span>
                        </div>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
