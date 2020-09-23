/*
 * © Copyright 2020 HP Development Company, L.P.
 * SPDX-License-Identifier: MIT
 */

import Debug from 'debug';
import _mapValues from 'lodash.mapvalues'
import _filter from 'lodash.filter'
import _merge from 'lodash.merge'
import _forEach from 'lodash.foreach'
import _trim from 'lodash.trim'
import Resource from './Resource';

const debug = new Debug('davinci:openapi');

const SWAGGER_VERSION = '2.0';

export const resources = [];

export const addResource = (resourceName, doc, basepath?) => {
	debug(`adding ${resourceName} resource`);
	// create the resource from the doc
	const resource = new Resource(resourceName, doc, basepath);
	// add it to the registry
	resources.push(resource);
};

export const sanitiseResourcePath = resourcePaths => {
	const EXCLUDED_PARAMETER_TYPES = ['res', 'req', 'context'];

	// remove non-standard parameters
	return _mapValues(resourcePaths, path => {
		return {
			...path,
			parameters: _filter(
				path.parameters,
				parameter => !EXCLUDED_PARAMETER_TYPES.includes(parameter.schema.type)
			)
		};
	});
};

export const generateFullSwagger = opts => {
	const fullSwagger = _merge({}, opts, {
		swagger: SWAGGER_VERSION,
		paths: {},
		definitions: {},
		parameters: {}
	});

	resources.forEach(resource => {
		// add definitions
		_forEach(resource.definitions, (resourceDefinition, defName) => {
			fullSwagger.definitions[defName] = resourceDefinition;
		});

		// TODO is this actually used, it is not part of the openAPI specification
		// add parameters
		_forEach(resource.parameters, (resourceParameter, paramName) => {
			fullSwagger.parameters[paramName] = resourceParameter;
		});

		// add paths
		_forEach(resource.paths, (resourcePath, pathName) => {
			const trimmedBasePath = _trim(resource.basePath, '/');
			let fullPath = `/${trimmedBasePath}${pathName}`;
			if (pathName === '/') fullPath = `/${trimmedBasePath}`;
			fullSwagger.paths[fullPath] = sanitiseResourcePath(resourcePath);
		});
	});

	return fullSwagger;
};
