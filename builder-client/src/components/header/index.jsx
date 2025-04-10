import { Link } from 'react-router-dom'
import HeaderLogo from '../../assets/images/header-logo.svg'
import { ROUTES } from '../../../constaints'

const Header = () => {
	return (
		<header>
			<img src={HeaderLogo} alt='' />
			<nav>
				<ul>
					<li>
						<Link to={{ pathname: ROUTES.HOME }}>Главная</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
