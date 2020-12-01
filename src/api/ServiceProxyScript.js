/* 这个文件使用 MVC Controllers 自动生成VUE访问脚本代理. */

import { axios } from '@/utils/request'
import { createNamespace, buildQueryString } from '@/utils/util'

const ApplicationApiDescriptionModel = {}

// module app


// controller identityService.host.controllers.userRolePermissions


createNamespace(ApplicationApiDescriptionModel, 'identityService.host.controllers.userRolePermissions');

ApplicationApiDescriptionModel.identityService.host.controllers.userRolePermissions.get = function () {
    return axios({
        url: 'api/identity/userRolePermissions',
        type: 'GET'
    });
};


// controller auditLogging.auditLogs


createNamespace(ApplicationApiDescriptionModel, 'auditLogging.auditLogs');

ApplicationApiDescriptionModel.auditLogging.auditLogs.getList = function (sorting, maxResultCount, skipCount, startTime, endTime, httpMethod, url, userName, applicationName, correlationId, maxExecutionDuration, minExecutionDuration, hasException, httpStatusCode) {
    return axios({
        url: 'api/audit-logging/audit-logs' + buildQueryString([{ name: 'sorting', value: sorting }, { name: 'maxResultCount', value: maxResultCount }, { name: 'skipCount', value: skipCount }, { name: 'startTime', value: startTime }, { name: 'endTime', value: endTime }, { name: 'httpMethod', value: httpMethod }, { name: 'url', value: url }, { name: 'userName', value: userName }, { name: 'applicationName', value: applicationName }, { name: 'correlationId', value: correlationId }, { name: 'maxExecutionDuration', value: maxExecutionDuration }, { name: 'minExecutionDuration', value: minExecutionDuration }, { name: 'hasException', value: hasException }, { name: 'httpStatusCode', value: httpStatusCode }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.auditLogging.auditLogs.get = function (id) {
    return axios({
        url: 'api/audit-logging/audit-logs/' + id + '',
        type: 'GET'
    });
};


// controller identity.claimTypes


createNamespace(ApplicationApiDescriptionModel, 'identity.claimTypes');

ApplicationApiDescriptionModel.identity.claimTypes.getListAsyncByInput = function (input) {
    return axios({
        url: 'api/identity/claim-types' + buildQueryString([{ name: 'filter', value: input.filter }, { name: 'sorting', value: input.sorting }, { name: 'skipCount', value: input.skipCount }, { name: 'maxResultCount', value: input.maxResultCount }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.identity.claimTypes.create = function (claimType) {
    return axios({
        url: 'api/identity/claim-types' + buildQueryString([{ name: 'name', value: claimType.name }, { name: 'required', value: claimType.required }, { name: 'isStatic', value: claimType.isStatic }, { name: 'regex', value: claimType.regex }, { name: 'regexDescription', value: claimType.regexDescription }, { name: 'description', value: claimType.description }, { name: 'valueType', value: claimType.valueType }, { name: 'extraProperties', value: claimType.extraProperties }, { name: 'concurrencyStamp', value: claimType.concurrencyStamp }, { name: 'id', value: claimType.id }]) + '',
        type: 'POST'
    });
};

ApplicationApiDescriptionModel.identity.claimTypes.update = function (claimType) {
    return axios({
        url: 'api/identity/claim-types' + buildQueryString([{ name: 'name', value: claimType.name }, { name: 'required', value: claimType.required }, { name: 'isStatic', value: claimType.isStatic }, { name: 'regex', value: claimType.regex }, { name: 'regexDescription', value: claimType.regexDescription }, { name: 'description', value: claimType.description }, { name: 'valueType', value: claimType.valueType }, { name: 'extraProperties', value: claimType.extraProperties }, { name: 'concurrencyStamp', value: claimType.concurrencyStamp }, { name: 'id', value: claimType.id }]) + '',
        type: 'PUT'
    });
};

ApplicationApiDescriptionModel.identity.claimTypes['delete'] = function (id) {
    return axios({
        url: 'api/identity/claim-types' + buildQueryString([{ name: 'id', value: id }]) + '',
        type: 'DELETE'
    });
};

ApplicationApiDescriptionModel.identity.claimTypes.getList = function () {
    return axios({
        url: 'api/identity-server/claim-types',
        type: 'GET'
    });
};


// controller identity.httpApi.users


createNamespace(ApplicationApiDescriptionModel, 'identity.httpApi.users');

ApplicationApiDescriptionModel.identity.httpApi.users.getClaims = function (id) {
    return axios({
        url: 'api/identity/users/' + id + '/claims',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.identity.httpApi.users.updateClaims = function (id, identityClaimDtos) {
    return axios({
        url: 'api/identity/users/' + id + '/claims',
        type: 'PUT',
        data: identityClaimDtos
    });
};


// controller ocelot.configuration.fileConfiguration


createNamespace(ApplicationApiDescriptionModel, 'ocelot.configuration.fileConfiguration');

ApplicationApiDescriptionModel.ocelot.configuration.fileConfiguration.get = function () {
    return axios({
        url: 'configuration',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.ocelot.configuration.fileConfiguration.post = function (fileConfiguration) {
    return axios({
        url: 'configuration',
        type: 'POST',
        data: fileConfiguration
    });
};


// controller ocelot.cache.outputCache


createNamespace(ApplicationApiDescriptionModel, 'ocelot.cache.outputCache');

ApplicationApiDescriptionModel.ocelot.cache.outputCache['delete'] = function (region) {
    return axios({
        url: 'outputcache/' + region + '',
        type: 'DELETE'
    });
};


// controller volo.abp.aspNetCore.mvc.applicationConfigurations.abpApplicationConfiguration


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.aspNetCore.mvc.applicationConfigurations.abpApplicationConfiguration');

ApplicationApiDescriptionModel.volo.abp.aspNetCore.mvc.applicationConfigurations.abpApplicationConfiguration.get = function () {
    return axios({
        url: 'api/abp/application-configuration',
        type: 'GET'
    });
};


// controller volo.abp.aspNetCore.mvc.apiExploring.abpApiDefinition


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.aspNetCore.mvc.apiExploring.abpApiDefinition');

ApplicationApiDescriptionModel.volo.abp.aspNetCore.mvc.apiExploring.abpApiDefinition.get = function () {
    return axios({
        url: 'api/abp/api-definition',
        type: 'GET'
    });
};



// module identity


// controller volo.abp.identity.identityRole


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.identity.identityRole');

ApplicationApiDescriptionModel.volo.abp.identity.identityRole.getList = function (input) {
    return axios({
        url: 'api/identity/roles' + buildQueryString([{ name: 'skipCount', value: input.skipCount }, { name: 'maxResultCount', value: input.maxResultCount }, { name: 'sorting', value: input.sorting }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityRole.get = function (id) {
    return axios({
        url: 'api/identity/roles/' + id + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityRole.create = function (input) {
    return axios({
        url: 'api/identity/roles',
        type: 'POST',
        data: input
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityRole.update = function (id, input) {
    return axios({
        url: 'api/identity/roles/' + id + '',
        type: 'PUT',
        data: input
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityRole['delete'] = function (id) {
    return axios({
        url: 'api/identity/roles/' + id + '',
        type: 'DELETE'
    });
};


// controller volo.abp.identity.identityUser


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.identity.identityUser');

ApplicationApiDescriptionModel.volo.abp.identity.identityUser.get = function (id) {
    return axios({
        url: 'api/identity/users/' + id + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUser.getList = function (input) {
    return axios({
        url: 'api/identity/users' + buildQueryString([{ name: 'filter', value: input.filter }, { name: 'sorting', value: input.sorting }, { name: 'skipCount', value: input.skipCount }, { name: 'maxResultCount', value: input.maxResultCount }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUser.create = function (input) {
    return axios({
        url: 'api/identity/users',
        type: 'POST',
        data: input
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUser.update = function (id, input) {
    return axios({
        url: 'api/identity/users/' + id + '',
        type: 'PUT',
        data: input
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUser['delete'] = function (id) {
    return axios({
        url: 'api/identity/users/' + id + '',
        type: 'DELETE'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUser.getRoles = function (id) {
    return axios({
        url: 'api/identity/users/' + id + '/roles',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUser.updateRoles = function (id, input) {
    return axios({
        url: 'api/identity/users/' + id + '/roles',
        type: 'PUT',
        data: input
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUser.findByUsername = function (username) {
    return axios({
        url: 'api/identity/users/by-username/{userName}',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUser.findByEmail = function (email) {
    return axios({
        url: 'api/identity/users/by-email/' + email + '',
        type: 'GET'
    });
};


// controller volo.abp.identity.identityUserLookup


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.identity.identityUserLookup');

ApplicationApiDescriptionModel.volo.abp.identity.identityUserLookup.findById = function (id) {
    return axios({
        url: 'api/identity/users/lookup/' + id + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.identityUserLookup.findByUserName = function (userName) {
    return axios({
        url: 'api/identity/users/lookup/by-username/' + userName + '',
        type: 'GET'
    });
};


// controller volo.abp.identity.profile


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.identity.profile');

ApplicationApiDescriptionModel.volo.abp.identity.profile.get = function () {
    return axios({
        url: 'api/identity/my-profile',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.profile.update = function (input) {
    return axios({
        url: 'api/identity/my-profile',
        type: 'PUT',
        data: input
    });
};

ApplicationApiDescriptionModel.volo.abp.identity.profile.changePassword = function (input) {
    return axios({
        url: 'api/identity/my-profile/change-password',
        type: 'POST',
        data: input
    });
};



// module multi-tenancy


// controller volo.abp.tenantManagement.tenant


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.tenantManagement.tenant');

ApplicationApiDescriptionModel.volo.abp.tenantManagement.tenant.get = function (id) {
    return axios({
        url: 'api/multi-tenancy/tenants/' + id + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.tenantManagement.tenant.getList = function (input) {
    return axios({
        url: 'api/multi-tenancy/tenants' + buildQueryString([{ name: 'filter', value: input.filter }, { name: 'sorting', value: input.sorting }, { name: 'skipCount', value: input.skipCount }, { name: 'maxResultCount', value: input.maxResultCount }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.tenantManagement.tenant.create = function (input) {
    return axios({
        url: 'api/multi-tenancy/tenants',
        type: 'POST',
        data: input
    });
};

ApplicationApiDescriptionModel.volo.abp.tenantManagement.tenant.update = function (id, input) {
    return axios({
        url: 'api/multi-tenancy/tenants/' + id + '',
        type: 'PUT',
        data: input
    });
};

ApplicationApiDescriptionModel.volo.abp.tenantManagement.tenant['delete'] = function (id) {
    return axios({
        url: 'api/multi-tenancy/tenants/' + id + '',
        type: 'DELETE'
    });
};

ApplicationApiDescriptionModel.volo.abp.tenantManagement.tenant.getDefaultConnectionString = function (id) {
    return axios({
        url: 'api/multi-tenancy/tenants/' + id + '/default-connection-string',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.tenantManagement.tenant.updateDefaultConnectionString = function (id, defaultConnectionString) {
    return axios({
        url: 'api/multi-tenancy/tenants/' + id + '/default-connection-string' + buildQueryString([{ name: 'defaultConnectionString', value: defaultConnectionString }]) + '',
        type: 'PUT'
    });
};

ApplicationApiDescriptionModel.volo.abp.tenantManagement.tenant.deleteDefaultConnectionString = function (id) {
    return axios({
        url: 'api/multi-tenancy/tenants/' + id + '/default-connection-string',
        type: 'DELETE'
    });
};



// module identity-server


// controller identityServer.apiResources


createNamespace(ApplicationApiDescriptionModel, 'identityServer.apiResources');

ApplicationApiDescriptionModel.identityServer.apiResources.getList = function (input) {
    return axios({
        url: 'api/identity-server/api-resources' + buildQueryString([{ name: 'skipCount', value: input.skipCount }, { name: 'maxResultCount', value: input.maxResultCount }, { name: 'sorting', value: input.sorting }]) + '',
        type: 'GET'
    });
};


// controller identityServer.clients


createNamespace(ApplicationApiDescriptionModel, 'identityServer.clients');

ApplicationApiDescriptionModel.identityServer.clients.getList = function (input) {
    return axios({
        url: 'api/identity-server/clients' + buildQueryString([{ name: 'skipCount', value: input.skipCount }, { name: 'maxResultCount', value: input.maxResultCount }, { name: 'sorting', value: input.sorting }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.identityServer.clients.create = function (input) {
    return axios({
        url: 'api/identity-server/clients',
        type: 'POST',
        data: input
    });
};

ApplicationApiDescriptionModel.identityServer.clients.update = function (id, client) {
    return axios({
        url: 'api/identity-server/clients/' + id + '',
        type: 'PUT',
        data: client
    });
};

ApplicationApiDescriptionModel.identityServer.clients['delete'] = function (id) {
    return axios({
        url: 'api/identity-server/clients/' + id + '',
        type: 'DELETE'
    });
};

ApplicationApiDescriptionModel.identityServer.clients.get = function (id) {
    return axios({
        url: 'api/identity-server/clients/' + id + '',
        type: 'GET'
    });
};


// controller identityServer.identityResources


createNamespace(ApplicationApiDescriptionModel, 'identityServer.identityResources');

ApplicationApiDescriptionModel.identityServer.identityResources.getList = function (input) {
    return axios({
        url: 'api/identity-server/identity-resources' + buildQueryString([{ name: 'skipCount', value: input.skipCount }, { name: 'maxResultCount', value: input.maxResultCount }, { name: 'sorting', value: input.sorting }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.identityServer.identityResources.get = function (id) {
    return axios({
        url: 'api/identity-server/identity-resources/' + id + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.identityServer.identityResources.update = function (id, input) {
    return axios({
        url: 'api/identity-server/identity-resources/' + id + '',
        type: 'PUT',
        data: input
    });
};

ApplicationApiDescriptionModel.identityServer.identityResources.create = function (input) {
    return axios({
        url: 'api/identity-server/identity-resources',
        type: 'POST',
        data: input
    });
};

ApplicationApiDescriptionModel.identityServer.identityResources['delete'] = function (id) {
    return axios({
        url: 'api/identity-server/identity-resources/' + id + '',
        type: 'DELETE'
    });
};



// module abp


// controller volo.abp.aspNetCore.mvc.proxyScripting.abpServiceProxyScript


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.aspNetCore.mvc.proxyScripting.abpServiceProxyScript');

ApplicationApiDescriptionModel.volo.abp.aspNetCore.mvc.proxyScripting.abpServiceProxyScript.getAll = function (model) {
    return axios({
        url: 'Abp/ServiceProxyScript' + buildQueryString([{ name: 'type', value: model.type }, { name: 'useCache', value: model.useCache }, { name: 'modules', value: model.modules }, { name: 'controllers', value: model.controllers }, { name: 'actions', value: model.actions }]) + '',
        type: 'GET'
    });
};


// controller volo.abp.aspNetCore.mvc.localization.abpLanguages


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.aspNetCore.mvc.localization.abpLanguages');

ApplicationApiDescriptionModel.volo.abp.aspNetCore.mvc.localization.abpLanguages['switch'] = function (culture, uiCulture, returnUrl) {
    return axios({
        url: 'Abp/Languages/Switch' + buildQueryString([{ name: 'culture', value: culture }, { name: 'uiCulture', value: uiCulture }, { name: 'returnUrl', value: returnUrl }]) + '',
        type: 'GET'
    });
};


// controller volo.abp.aspNetCore.mvc.applicationConfigurations.abpApplicationConfigurationScript


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.aspNetCore.mvc.applicationConfigurations.abpApplicationConfigurationScript');

ApplicationApiDescriptionModel.volo.abp.aspNetCore.mvc.applicationConfigurations.abpApplicationConfigurationScript.get = function () {
    return axios({
        url: 'Abp/ApplicationConfigurationScript',
        type: 'GET'
    });
};



// module abp


// controller volo.abp.featureManagement.features


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.featureManagement.features');

ApplicationApiDescriptionModel.volo.abp.featureManagement.features.get = function (providerName, providerKey) {
    return axios({
        url: 'api/abp/features' + buildQueryString([{ name: 'providerName', value: providerName }, { name: 'providerKey', value: providerKey }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.featureManagement.features.update = function (providerName, providerKey, input) {
    return axios({
        url: 'api/abp/features' + buildQueryString([{ name: 'providerName', value: providerName }, { name: 'providerKey', value: providerKey }]) + '',
        type: 'PUT',
        data: input
    });
};


// controller volo.abp.permissionManagement.permissions


createNamespace(ApplicationApiDescriptionModel, 'volo.abp.permissionManagement.permissions');

ApplicationApiDescriptionModel.volo.abp.permissionManagement.permissions.get = function (providerName, providerKey) {
    return axios({
        url: 'api/abp/permissions' + buildQueryString([{ name: 'providerName', value: providerName }, { name: 'providerKey', value: providerKey }]) + '',
        type: 'GET'
    });
};

ApplicationApiDescriptionModel.volo.abp.permissionManagement.permissions.update = function (providerName, providerKey, input) {
    return axios({
        url: 'api/abp/permissions' + buildQueryString([{ name: 'providerName', value: providerName }, { name: 'providerKey', value: providerKey }]) + '',
        type: 'PUT',
        data: input
    });
};


export default ApplicationApiDescriptionModel;
