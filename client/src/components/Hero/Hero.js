import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Hero.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getNews } from '../../actions/posts';
import parser from 'html-react-parser'
import { useHistory } from 'react-router-dom'

const Hero = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(getNews());
         // eslint-disable-next-line 
    }, []);

    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} interval={5000}>
        <div className={styles.bigImage} style={{backgroundImage: 'url("https://res.cloudinary.com/wabis/image/upload/v1629990086/malimbus-special/256561451_gahxuq.jpg")'}}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <div>
                        <h1 >MALIMBUS</h1>
                        <h1 >Journal of West African Ornithological Society</h1>
                        {/* <p>Dedicated to capacity building for conservation and research in tropical ecology in West Africa</p> */}
                    </div>
                </div>
            </div>
        </div>

        {
            posts.slice(0, 4).map((post) => (
                <div key={post._id} className={styles.bigImage} style={{backgroundImage: `url(${post.fileUrl})`}}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    {/* <div>
                        <img src="https://i.postimg.cc/W1qGRwy6/aplori-logo-white.png" alt="aplori-logo"/>
                    </div> */}
                    <div>
                        <h1>{post.title}</h1>
                       
                        <div> {parser(post.content.split(' ').splice(0, 16).join(' '))}</div>
                        <div className={styles.buttonContainer}>
                        <button onClick={() => history.push(`/news/${post.slug}`)} className={styles.button}>Read more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            ))
        }
        

        

        </Carousel>
    )
}

export default Hero
