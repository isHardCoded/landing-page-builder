import { Link } from 'react-router-dom'

import Header from '../../components/header'
import styles from './index.module.scss'

import TemplateBlockImage from './../../assets/images/template-block-image.png'
import LandingBlockImage from './../../assets/images/landing-block-image.png'
import { ROUTES } from '../../../constaints'

const Home = () => {
	return (
		<>
			<Header />
			<main>
				<section className={styles.container}>
					<article className={styles.block}>
						<img src={TemplateBlockImage} alt='' />
						<div>
							<h3>Where to start?</h3>
							<p>
								Quickly and efficiently select the most suitable template for
								their needs.
							</p>
							<button>
								<Link to={{ pathname: ROUTES.LANDING_EDITOR }}>
									Choose template
								</Link>
							</button>
						</div>
					</article>
					<article className={styles.block}>
						<img src={LandingBlockImage} alt='' />
						<div>
							<h3>Create from scratch</h3>
							<p>
								Ideal for those who prefer full creative control. Start a
								project from the ground up.
							</p>
							<button>
								<Link to={{ pathname: ROUTES.LANDING_EDITOR }}>
									Create landing
								</Link>
							</button>
						</div>
					</article>
				</section>
			</main>
		</>
	)
}

export default Home
