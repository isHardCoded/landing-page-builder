import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constaints'

import styles from './index.module.scss'
import HeaderLogo from '../../assets/images/header-logo.svg'

const Header = ({ isHome }) => {
	return (
		<header className={styles.header}>
			<img src={HeaderLogo} alt='' />
			{isHome && (
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
			)}
			<button>Login</button>
		</header>
	)
}

export default Header
