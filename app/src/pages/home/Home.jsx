import './home.css'
import Share from "../../components/share/Share"
import Posts from '../../components/posts/Posts'

const Home = () => {
  return (
    <div className='home'>
      <Share/> 
      <Posts/>

    </div>
  )
}

export default Home