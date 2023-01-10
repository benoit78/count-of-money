import Feed from "./pages/Feed"
import Home from "./pages/Home"
import Crypto from "./pages/Crypto/Crypto"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Watchlist from "./pages/Watchlist"
import Profil from "./pages/Profil"
import CryptoData from "./pages/Crypto/CryptoData"
import FeedArticle from "./pages/Feed/FeedArticle"

export const authRoutes = [
  {
    description: `login page`,
    path: "/login",
    component: Login,
  },
  {
    description: `Register page`,
    path: "/register",
    component: Register,
  },
]

export const homeRoutes = [
  {
    description: `Home page`,
    path: "/",
    component: Home,
  },
  {
    description: `Crypto page`,
    path: "/crypto",
    component: Crypto,
  },
  {
    description: `Crypto value page`,
    path: "/crypto/:id",
    component: CryptoData,
  },
  {
    description: `Post page`,
    path: "/feed",
    component: Feed,
  },
  {
    description: `Article page`,
    path: "/feed/article/:title",
    component: FeedArticle,
  },
  {
    description: `Watchlist page`,
    path: "/watchlist",
    component: Watchlist,
  },
  {
    description: `Profil page`,
    path: "/profil",
    component: Profil,
  },
]
