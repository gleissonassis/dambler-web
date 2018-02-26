import AuctionPage from '@/components/pages/auctions/Auction'
import AuctionsOnLinePage from '@/components/pages/auctions/AuctionsOnLine'
import AuctionsOpenPage from '@/components/pages/auctions/AuctionsOpen'
import AuctionsPage from '@/components/pages/auctions/Auctions'

const routes = [
  {
    path: '/auctions',
    name: 'Leilões',
    component: AuctionsPage
  },
  {
    path: '/auctions/online',
    name: 'Leilões em andamento',
    component: AuctionsOnLinePage
  },
  {
    path: '/auctions/open',
    name: 'Leilões abertos',
    component: AuctionsOpenPage
  },
  {
    path: '/auctions/:id',
    name: 'Leilão',
    component: AuctionPage
  }
]

export default { routes }
