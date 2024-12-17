import { OrbitingCircles } from "./ui/orbiting-circles";

export function Orbit() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        {/* DOLOMAJ */}
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Icons.whatsapp />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Icons.photoshop />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        reverse
      >
        <Icons.premierePro />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        delay={20}
        reverse
      >
        <Icons.figma />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  figma: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="q17mbB32E_FbIzPpfjq_Ta_W0YEwBDDfTeu_gr1"
        x1="16.309"
        x2="23.023"
        y1="1.101"
        y2="19.546"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#f44f5a"></stop>
        <stop offset=".443" stopColor="#ee3d4a"></stop>
        <stop offset="1" stopColor="#e52030"></stop>
      </linearGradient>
      <path
        fill="url(#q17mbB32E_FbIzPpfjq_Ta_W0YEwBDDfTeu_gr1)"
        d="M26,17h-8c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h8V17z"
      ></path>
      <linearGradient
        id="q17mbB32E_FbIzPpfjq_Tb_W0YEwBDDfTeu_gr2"
        x1="15.64"
        x2="22.314"
        y1="14.636"
        y2="32.971"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ae4cd5"></stop>
        <stop offset="1" stopColor="#9331bf"></stop>
      </linearGradient>
      <path
        fill="url(#q17mbB32E_FbIzPpfjq_Tb_W0YEwBDDfTeu_gr2)"
        d="M25,31h-7c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7V31z"
      ></path>
      <linearGradient
        id="q17mbB32E_FbIzPpfjq_Tc_W0YEwBDDfTeu_gr3"
        x1="14.81"
        x2="21.821"
        y1="26.357"
        y2="45.617"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#33c481"></stop>
        <stop offset="1" stopColor="#21a366"></stop>
      </linearGradient>
      <path
        fill="url(#q17mbB32E_FbIzPpfjq_Tc_W0YEwBDDfTeu_gr3)"
        d="M18,45L18,45c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7v7C25,41.866,21.866,45,18,45z"
      ></path>
      <linearGradient
        id="q17mbB32E_FbIzPpfjq_Td_W0YEwBDDfTeu_gr4"
        x1="27.498"
        x2="34.119"
        y1=".512"
        y2="18.702"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#f09ca2"></stop>
        <stop offset="1" stopColor="#eb6773"></stop>
      </linearGradient>
      <path
        fill="url(#q17mbB32E_FbIzPpfjq_Td_W0YEwBDDfTeu_gr4)"
        d="M32,17h-7V3h7c3.866,0,7,3.134,7,7v0C39,13.866,35.866,17,32,17z"
      ></path>
      <linearGradient
        id="q17mbB32E_FbIzPpfjq_Te_W0YEwBDDfTeu_gr5"
        x1="28.714"
        x2="34.857"
        y1="14.972"
        y2="31.85"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#32bdef"></stop>
        <stop offset="1" stopColor="#1ea2e4"></stop>
      </linearGradient>
      <circle
        cx="32"
        cy="24"
        r="7"
        fill="url(#q17mbB32E_FbIzPpfjq_Te_W0YEwBDDfTeu_gr5)"
      ></circle>
    </svg>
  ),
  photoshop: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#2100c4"
        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5 V37z"
      ></path>
      <path
        fill="#3dd9eb"
        d="M14.1,31.065V15.63c0-0.105,0.045-0.165,0.15-0.165c0.255,0,0.495,0,0.84-0.015 c0.36-0.015,0.735-0.015,1.14-0.03c0.405-0.015,0.84-0.015,1.305-0.03C18,15.375,18.45,15.375,18.9,15.375 c1.23,0,2.25,0.15,3.09,0.465c0.75,0.255,1.44,0.675,2.01,1.23c0.48,0.48,0.855,1.065,1.095,1.71 c0.225,0.63,0.345,1.275,0.345,1.95c0,1.29-0.3,2.355-0.9,3.195c-0.6,0.84-1.44,1.47-2.415,1.83 c-1.02,0.375-2.145,0.51-3.375,0.51c-0.36,0-0.6,0-0.75-0.015c-0.15-0.015-0.36-0.015-0.645-0.015v4.815 c0.015,0.105-0.06,0.195-0.165,0.21c-0.015,0-0.03,0-0.06,0h-2.85C14.16,31.26,14.1,31.2,14.1,31.065z M17.37,18.36v5.04 c0.21,0.015,0.405,0.03,0.585,0.03h0.795c0.585,0,1.17-0.09,1.725-0.27c0.48-0.135,0.9-0.42,1.23-0.795 c0.315-0.375,0.465-0.885,0.465-1.545c0.015-0.465-0.105-0.93-0.345-1.335c-0.255-0.39-0.615-0.69-1.05-0.855 c-0.555-0.225-1.155-0.315-1.77-0.3c-0.39,0-0.735,0-1.02,0.015C17.685,18.33,17.475,18.345,17.37,18.36L17.37,18.36z"
      ></path>
      <path
        fill="#3dd9eb"
        d="M34.8,22.485c-0.45-0.24-0.93-0.405-1.44-0.51c-0.555-0.12-1.11-0.195-1.68-0.195 c-0.3-0.015-0.615,0.03-0.9,0.105c-0.195,0.045-0.36,0.15-0.465,0.3c-0.075,0.12-0.12,0.27-0.12,0.405 c0,0.135,0.06,0.27,0.15,0.39c0.135,0.165,0.315,0.3,0.51,0.405c0.345,0.18,0.705,0.345,1.065,0.495 c0.81,0.27,1.59,0.645,2.31,1.095c0.495,0.315,0.9,0.735,1.185,1.245c0.24,0.48,0.36,1.005,0.345,1.545 c0.015,0.705-0.195,1.41-0.585,1.995c-0.42,0.6-1.005,1.065-1.68,1.335c-0.735,0.315-1.635,0.48-2.715,0.48 c-0.69,0-1.365-0.06-2.04-0.195c-0.525-0.09-1.05-0.255-1.53-0.48c-0.105-0.06-0.18-0.165-0.165-0.285v-2.61 c0-0.045,0.015-0.105,0.06-0.135c0.045-0.03,0.09-0.015,0.135,0.015c0.585,0.345,1.2,0.585,1.86,0.735 c0.57,0.15,1.17,0.225,1.77,0.225c0.57,0,0.975-0.075,1.245-0.21c0.24-0.105,0.405-0.36,0.405-0.63c0-0.21-0.12-0.405-0.36-0.6 c-0.24-0.195-0.735-0.42-1.47-0.705c-0.765-0.27-1.47-0.63-2.13-1.08c-0.465-0.33-0.855-0.765-1.14-1.275 c-0.24-0.48-0.36-1.005-0.345-1.53c0-0.645,0.18-1.26,0.51-1.815c0.375-0.6,0.93-1.08,1.575-1.38 c0.705-0.36,1.59-0.525,2.655-0.525c0.615,0,1.245,0.045,1.86,0.135c0.45,0.06,0.885,0.18,1.29,0.345 c0.06,0.015,0.12,0.075,0.15,0.135c0.015,0.06,0.03,0.12,0.03,0.18v2.445c0,0.06-0.03,0.12-0.075,0.15 C34.935,22.515,34.86,22.515,34.8,22.485z"
      ></path>
    </svg>
  ),
  openai: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  premierePro: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#ae4cd5"
        d="M36,6H12c-3.314,0-6,2.686-6,6v24c0,3.314,2.686,6,6,6h24c3.314,0,6-2.686,6-6V12	C42,8.686,39.314,6,36,6z"
      ></path>
      <linearGradient
        id="CrZKEob4grqPVxpzGsd6Ua_87ZqKgnPMW8m_gr1"
        x1="8"
        x2="40"
        y1="24"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#7819a2"></stop>
        <stop offset="1" stopColor="#771aa9"></stop>
      </linearGradient>
      <path
        fill="url(#CrZKEob4grqPVxpzGsd6Ua_87ZqKgnPMW8m_gr1)"
        d="M36,40H12c-2.209,0-4-1.791-4-4V12c0-2.209,1.791-4,4-4h24c2.209,0,4,1.791,4,4v24	C40,38.209,38.209,40,36,40z"
      ></path>
      <path
        fill="#fff"
        d="M15,15.607c0-0.26,0.192-0.476,0.451-0.498c0.547-0.046,1.652-0.109,3.628-0.109 c3.588,0,6.101,1.423,6.101,5.317c0,3.512-2.391,5.573-6.249,5.573c-0.225,0-0.45,0-1.216,0v5.561c0,0.276-0.224,0.5-0.5,0.5H15.5 c-0.276,0-0.5-0.224-0.5-0.5V15.607z M17.715,22.919c0,0.275,0.22,0.498,0.495,0.5c0.359,0.002,0.808,0.005,0.959,0.005 c2.203,0,3.205-1.306,3.205-3.056c0-1.639-0.974-2.917-3.01-2.917c-0.435,0-0.862,0.013-1.173,0.025 c-0.268,0.011-0.476,0.232-0.476,0.5V22.919z"
      ></path>
      <path
        fill="#fff"
        d="M33.207,23.267c-0.343-0.244-0.743-0.366-1.2-0.366c-0.619,0-1.104,0.297-1.452,0.892 c-0.35,0.595-0.523,1.404-0.523,2.428v5.278c0,0.276-0.224,0.5-0.5,0.5H27.68c-0.276,0-0.5-0.224-0.5-0.5v-11.1 c0-0.276,0.224-0.5,0.5-0.5h1.852c0.276,0,0.5,0.224,0.5,0.5v1.745h0.036c0.451-1.638,1.263-2.458,2.437-2.458 c0.3,0,0.535,0.047,0.703,0.142V23.267z"
      ></path>
    </svg>
  ),
  whatsapp: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="b"
          x1="85.915"
          x2="86.535"
          y1="32.567"
          y2="137.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
        <filter
          id="a"
          width="1.115"
          height="1.114"
          x="-.057"
          y="-.057"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="3.531" />
        </filter>
      </defs>
      <path
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        fill="#b3b3b3"
        filter="url(#a)"
      />
      <path
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
        fill="#ffffff"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
        fill="url(#linearGradient1780)"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
        fill="url(#b)"
      />
      <path
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
        fill="#ffffff"
        fillRule="evenodd"
      />
    </svg>
  ),
};
