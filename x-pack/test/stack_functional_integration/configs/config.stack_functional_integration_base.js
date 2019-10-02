/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


import getAllConfigs from './get_all_configs';
import serverConfig from './server_config';
import { resolve } from 'path';
import getProvisionedConfigs from './get_provisioned_configs';

const reportName = 'Stack Functional Integration Tests';
const testsFolder = '../test/functional/apps';
const relativePath = '../../../../../integration-test/qa/envvars.sh';
const prepend = testFile => require.resolve(`${testsFolder}/${testFile}`);

export default async ({ readConfigFile }) => {
  const { tests, ...provisionedConfigs } = await getProvisionedConfigs(resolve(__dirname, relativePath));
  const defaultConfigs = await getAllConfigs(readConfigFile, '../../functional/config');

  return {
    ...defaultConfigs,
    junit: {
      reportName: `${reportName} - ${provisionedConfigs.VM}`
    },
    servers: serverConfig.servers,
    apps: serverConfig.apps,
    stackFunctionalIntegrationTests: {
      envObj: provisionedConfigs
    },
    testFiles: tests.map(prepend),
  };
}
