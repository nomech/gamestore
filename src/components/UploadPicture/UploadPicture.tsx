import React, { useEffect, useState } from 'react';
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

	const uploadFile = async (file: File) => {
		const fileName = `${Date.now()}-${file.name}`;
		const { data, error } = await supabase.storage
			.from('profilePicture')
			.upload(`profilePictures/${fileName}`, file);
		if (error) {
			let errorMsg = 'Upload failed: ';
			if (error.message.includes('File size exceeds')) {
				errorMsg += 'File too large. Please upload a smaller image.';
			} else if (error.message.includes('quota')) {
				errorMsg += 'Storage quota exceeded. Please contact support.';
			} else if (error.message.includes('Invalid file format')) {
				errorMsg += 'Invalid file format. Please upload a JPG, JPEG, PNG, or WEBP image.';
			} else {
				errorMsg += error.message;
			}
			throw new Error(errorMsg);
		} else {
			console.log(data);
		}
	};

	const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

		try {
			await uploadFile(file[0]);
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
