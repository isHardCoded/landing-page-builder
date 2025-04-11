import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constaints'

import styles from './index.module.scss'
import HeaderLogo from '../../assets/images/header-logo.svg'
import UserIcon from '../../assets/images/user-icon.png'

const Header = ({ isHome }) => {
	return (
		<header className={styles.header}>
			<img src={HeaderLogo} alt='' />
			{isHome ? (
				<div className={styles.headerContent}>
					<nav>
						<ul>
							<li>
								<Link to={{ pathname: ROUTES.HOME }}>General</Link>
							</li>
							<li>
								<Link to={{ pathname: ROUTES.LANDING_EDITOR }}>Build</Link>
							</li>
							<li>
								<Link to={{ pathname: ROUTES.CONTACTS }}>Contacts</Link>
							</li>
						</ul>
					</nav>
					<div>
						<img src={UserIcon} alt='' />
						<span>Username</span>
					</div>
				</div>
			) : (
				<button>Login</button>
			)}
		</header>
	)
}

export default Header
