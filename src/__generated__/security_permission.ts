/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: jTAzcnFHyQAwPwstSFTkXm2FadAMI6A7WKEiYsOTCbZhheyemZ6AzBVssOCSUadSoWZcsy2XWCE+iJwHMqKBSg==
 */

/* eslint-disable */
// tslint:disable

interface SecurityPermission {
  description: (string) | null
  id: number & {readonly __brand?: 'security_permission_id'}
  name: (string) | null
}
export default SecurityPermission;

interface SecurityPermission_InsertParameters {
  description?: (string) | null
  id: number & {readonly __brand?: 'security_permission_id'}
  name?: (string) | null
}
export type {SecurityPermission_InsertParameters}
