import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';
const localServer = 'D:\\Open Server Work\\domains\\localhost\\dist';

export const path = {
	build: buildFolder,
	src: srcFolder,
	localServer: localServer,
};