import React from 'react';
import styles from './HeroSection.module.css';

type Props = {
	imageUrl: string;
	alt: string;
	logoUrl: string;
};

const HeroSection = ({ imageUrl, alt, logoUrl }: Props) => {
	return (
		<>
			<section className={styles.heroSection}>
				<img className={styles.heroBanner} src={imageUrl} alt={alt} />
				<div className={styles.logoContainer}>
					<img className={styles.logo_url} src={logoUrl} alt="" />
				</div>
			</section>
		</>
	);
};

export default HeroSection;
