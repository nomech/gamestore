import React, { use, useEffect, useState } from 'react';
import styles from './UploadPicture.module.css';
import placeholder from '../../assets/images/placeholder.png';
import supabase from '../../../supabaseConfig';

interface UploadPictureProps {
	isSubmitSuccessful: boolean;
}

const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

const UploadPicture = ({ isSubmitSuccessful }: UploadPictureProps) => {
	const [previewUrl, setPreviewUrl] = useState<string>(placeholder);
	const [error, setError] = useState<string>('');

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.target.files;

		if (!file || !file[0]) {
			return;
		}

		if (!file[0].type || !acceptedImageTypes.includes(file[0].type)) {
			setError('Invalid file type. Please upload a JPG, JPEG, PNG, or WEBP image.');
			return;
		}

		const localUrl = URL.createObjectURL(file[0]);
		setPreviewUrl(localUrl);

		// Upload file using standard upload
		const uploadFile = async (file: File) => {
			const fileName = `${Date.now()}-${file.name}`;
			const { data, error } = await supabase.storage
				.from('profilePicture')
				.upload(`profilePictures/${fileName}`, file);
			if (error) {
				throw new Error(`Upload failed: ${error.message}`);
			} else {
				console.log(data);
			}
		};

		try {
			uploadFile(file[0]);
		} catch (error: any) {
			setError(`Upload failed: ${error.message}`);
		}
	};

	useEffect(() => {
		if (!isSubmitSuccessful) {
			return;
		}
		setPreviewUrl(placeholder);
	}, [isSubmitSuccessful]);

	return (
		<div className={styles.inputGroup}>
			<div className={styles.imagePreview}>
				<img src={previewUrl} alt="" className={styles.image} />
			</div>
			<input
				id="profilePicture"
				type="file"
				className={styles.formInput}
				accept=".jpg, .jpeg, .png, .webp"
				onChange={handleOnChange}
			/>

			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

export default UploadPicture;
