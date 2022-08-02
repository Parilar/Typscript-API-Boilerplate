import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    logger
} from './common';

export default [
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    logger
];
