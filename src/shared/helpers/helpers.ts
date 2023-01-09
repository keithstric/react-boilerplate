import {DateFns} from '@shared/helpers/date-fns.utils';

export const EmailRegEx = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
export const EmailRegExGlobal = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
export const FloatingNumberRegex = /[+-]?([0-9]*[.])?[0-9]{1,2}/;
export const TimeStringRegex = /^(?:([0-9]{2}):([0-9]{2}) (AM|PM)$)/;
export const IsoRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

const stringIsNumber = (value: string) => !isNaN(Number(value));

/**
 * Convert an enum into an array that can be used in a dropdown menu
 * @param enumObj
 */
export const enumToArray = (enumObj: any) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
	return Object.keys(enumObj).map((key) => enumObj[key]);
};

export const enumKeysToArray = (enumObj: any) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.keys(enumObj);
};

/**
 * take an image blob and convert it to base64
 * @param imgBlob
 */
export const imageToBase64 = (imgBlob: Blob): Promise<string | ArrayBuffer> => {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.readAsDataURL(imgBlob);
		reader.onerror = (err) => {
			rej(err);
		};
		reader.onloadend = () => {
			const base64data = reader.result;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			res(base64data);
		};
	});
};

/**
 * Will provide an awaitable promise that resolves after a provided
 * amount of time
 */
export const timeoutToPromise = (msDelay: number): Promise<any> => {
	return new Promise((res, rej) => setTimeout(res, msDelay));
};

/**
 * Just an alias to {@link timeoutToPromise}
 * Will provide an awaitable promise that resolves after a provided
 * amount of time
 */
export const delay = timeoutToPromise;

/**
 * Get a blob and convert it to a file with the provided filename
 * @param theBlob
 * @param fileName
 * @param type
 */
export const convertBlobToFile = (theBlob: Blob, fileName: string, type: string): File => {
	return new File([theBlob], fileName, {lastModified: new Date().getTime(), type});
};

/**
 * Get the filename, extension and full file name from a file name
 * @param fileName
 */
export const getFileNameInfo = (fileName: string): {fileNamePart: string, extensionPart: string, fullFileName: string} => {
	const filePartsArr = fileName.split('.');
	const fileNamePart = filePartsArr.slice(0, filePartsArr.length - 1).join('.');
	return {
		fileNamePart,
		extensionPart: filePartsArr[filePartsArr.length - 1],
		fullFileName: filePartsArr.join('.'),
	};
};

/**
 * Convert an object to FormData
 * @param obj
 */
export const objectToFormData = (obj: any) => {
	const formData = new FormData();
	if (obj) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const keys = Object.keys(obj);
		keys.forEach((key) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
			formData.append(key, obj[key]);
		});
	}
	return formData;
};

export const convertBufferToFile = (buffer: Buffer, fileName: string, fileType: string) => {
	const blob = new Blob([buffer], {type: fileType});
	console.log('convertBufferToFile, blob=', blob);
	return convertBlobToFile(blob, fileName, fileType);
};

export const convertBase64ToBlob = (base64: string, fileType: string) => {
	const bytes = atob(base64);
	const ab = new ArrayBuffer(bytes.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}
	return new Blob([ab], {type: fileType});
};

export const convertBufferToBase64 = (buffer: Buffer) => {
	let binary = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[i] );
	}
	return btoa(binary);
};

export const convertBlobToBuffer = async (blob: Blob) => {
	const chunkBuffer = await new Response(blob).arrayBuffer();
	return new Buffer(chunkBuffer);
};

export const getRandomInteger = () => {
	const min = Math.ceil(1);
	const max = Math.floor(1000);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Convert a time formatted as "01:00 AM"/"01:00 PM"/"01:00" as today's date
 * with the appropriate time set.
 * So if today is Jan 1, 2022 and the passed time was 1:00 PM:
 * will return a date for 01/01/2022 13:00
 * @param time
 */
export const getDateFromTime = (time: string | Date) => {
	if (typeof time === 'string') {
		if (TimeStringRegex.test(time)) {
			const timeParts = time.match(TimeStringRegex);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const hour = timeParts[3].toLowerCase() === 'pm' ? Number(timeParts[1]) + 12 : Number(timeParts[1]);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const minute = Number(timeParts[2]);
			let date = new Date();
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
			date = DateFns.setHours(date, hour);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
			date = DateFns.setMinutes(date, minute);
			return date;
		} else if (IsoRegex.test(time)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
			return DateFns.parseISO(time);
		}
	} else if (time instanceof Date) {
		return time;
	}
};

export const stringToColor = (textString: string): string => {
	let color = 'transparent';
	if (textString) {
		let hash = 0;
		for (let i = 0; i < textString.length; i++) {
			hash = textString.charCodeAt(i) + ((hash << 5) - hash);
		}
		color = '#';
		for (let j = 0; j < 3; j++) {
			const value = (hash >> (j * 8)) & 0xff;
			const valueStr = value.toString(16);
			const hexColor = ('00' + valueStr).substr(-2);
			color += hexColor;
		}
	}
	return color;
};

export const removeCountryFromLanguageCode = (languageCode: string): string => {
	const split = languageCode.split('-');
	return split[0];
};

/**
 * Title case a string
 * @param {string} str
 */
export const titleCaseString = (str: string | undefined): string => {
	if (str) {
		const sentence = str.toLowerCase().split(' ');
		for (let i = 0; i < sentence.length; i++) {
			sentence[i] = sentence[i][0]?.toUpperCase() + sentence[i].slice(1);
		}
		return sentence.join(' ');
	}
	return '';
};
