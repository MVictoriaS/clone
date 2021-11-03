import {gql, GraphQLClient} from 'graphql-request'
import Link from 'next/Link'
import Image from 'next/Image'
import Section from "../components/Section"
import NavBar from "../components/NavBar"
import disneyLogo from '../public/disney-button.png'
import marvelLogo from '../public/marvel-button.png'
import natgeoLogo from '../public/natgeo-button.png'
import starwarsLogo from '../public/star-wars-button.png'
import pixarLogo from '../public/pixar.png'

export const getStaticProps = async () => {
    const url = "https://api-eu-central-1.graphcms.com/v2/ckuy3yk5g188901zc7rld5cpm/master"
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzQ4MjYzMzUsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrdXkzeWs1ZzE4ODkwMXpjN3JsZDVjcG0vbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNTc2YmQ5ZmMtODkyOC00NjFiLTlmNjctZDA4NDI0ZWM0NWU2IiwianRpIjoiY2t2MTFlMWw2MThyMTAxeHZhcWE1aGN4aSJ9.FR4uTc1q7fEESWzeEVUG9iv9HRm6eJXpEL3f1Dpw2uVO9K_D18HWS9ztMu3d7MxUG0ZTvihT_vpDEzk5GHuR6mgq4xf9M5k6Z7XMidEDeB1ZpLm45INCZQstopkbT5Cj3gmP_NfKGjQyaEjjVqv_D7vO3IQpB3592SAtXLm9KairaEpFP-9bifneuP8ozPxk8-UVmnh7ES5iCrMLRwiCZ38tAH_RBt9YD-9KGqJ658GHceXhw_3xImogYoToAJVP_PxD2L5LAuh6NLvJ-EtT64TIEwMW4fJXpzyiQpLpHDQrGe81o95UglJ_AO0XYzfuz_Xl7y6mFzCPy_wRAzaBPdSn2qAKvHjYGxgKd2J51mawl8epA37FXGj3P8tHYHBphxJmV1M0_G7ieiZkCBSPD_L1JbfmG4ACL1kQyIOTN2y3Jd-7cv2LvwXwjb0OWFZzSTgon17nQ66xfXq6_xdRk4W63sQ6CSAfNvp6-Jh8K51z3NDN0hz3qLpA6eFr6SSwR7pTPz01qc4hQgJamVTESvTt6B82RHfUjtUyxmfnVxukWnlSZQ_G1CGdh7gMyJV2hpWEINcwKzbdbM16PsjiI3Cfi85ok9q5ndh2sgp0uThsl42Kx-TI_fYp42Y2whA59ndOcpJGcKrmiqOBjkymRz-AiXkifW9CqQOZclVGq2s"
        }
    })

    const videosQuery = gql`
    query {
      videos {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `


  

    const data = await graphQLClient.request(videosQuery)
    const videos = data.videos
   

    return {
        props: {
            videos,
        }
    }
}


const Home = ({videos}) => {


    const randomVideo = (videos) => {
        return videos[Math.floor(Math.random() * videos.length)]
    }

    const filterVideos = (videos, genre) => {
        return videos.filter((video) => video.tags.includes(genre))
    }

    const unSeenVideos = (videos) => {
        return videos.filter(video => video.seen == false || video.seen == null)
    }

    console.log('not seen:', videos.filter(video => video.seen == false || video.seen == null))


    return (
        <>
           
            <div className="app">
                <div className="main-video">
                    <img src={randomVideo(videos).thumbnail.url}
                         alt={randomVideo(videos).title}/>
                </div>

                <div className="video-feed">
                    <Link href="#disney">
                        <div className="franchise" id="disney">
                            <Image src={disneyLogo}/>
                        </div>
                    </Link>
                    <Link href="#pixar">
                        <div className="franchise" id="pixar">
                            <Image src={pixarLogo}/>
                        </div>
                    </Link>
                    <Link href="#star-wars">
                        <div className="franchise" id="star-wars">
                            <Image src={starwarsLogo}/>
                        </div>
                    </Link>
                    <Link href="#nat-geo">
                        <div className="franchise" id="nat-geo">
                            <Image src={natgeoLogo}/>
                        </div>
                    </Link>
                    <Link href="#marvel">
                        <div className="franchise" id="marvel">
                            <Image src={marvelLogo}/>
                        </div>
                    </Link>
                </div>
                <Section genre={'Recommended for you'} videos={unSeenVideos(videos)}/>
                <Section genre={'Family'} videos={filterVideos(videos, 'family')}/>
                <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')}/>
                <Section genre={'Classic'} videos={filterVideos(videos, 'classic')}/>
                <Section id="pixar" genre={'Pixar'} videos={filterVideos(videos, 'pixar')}/>
                <Section id="marvel" genre={'Marvel'} videos={filterVideos(videos, 'thriller')}/>
                <Section id="nat-geo" genre={'National Geographic'}
                         videos={filterVideos(videos, 'national-geographic')}/>
                <Section id="disney" genre={'Disney'} videos={filterVideos(videos, 'disney')}/>
                <Section id="star-wars" genre={'Star Wars'} videos={filterVideos(videos, 'star-wars')}/>


            </div>
        </>
    )
}

export default Home










