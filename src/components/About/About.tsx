import React from 'react';
import styles from './About.module.css';

type Props = {
	text: string;
};

const About = ({ text }: Props) => {
	return (
		<div className={styles.about}>
			<h3>About this game</h3>
			<p>{`${text}`}</p>
		</div>
	);
};

export default About;
