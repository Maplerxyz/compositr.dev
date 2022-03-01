export type ResourceID = `${number}-${number}-${string}`;
/**
 * Resource IDs are used to uniquely identify resources in the database. They are designed to be
 * unique to each resource and are composed of a timestamp, a number and a string. They should be unique,
 * reliable and can be used to identify a resource. The entire thing is a string.
 *
 * They consist of three parts, in a format describe in the type above.
 *
 * The first part is the timestamp of when the resource was created. This is a unix millis timestamp.
 * The second part is the PID or ID of the worker which created the resource.
 * The third part is the first 8 characters of the SHA-256 hash of the resource.
 *
 * Here is an example of a resource ID:
 *
 * "1646016927006-115051-4e6665d9"
 *  ^^^^^^^^^^^^^ ^^^^^^ ^^^^^^^^
 *  Timestamp     PID    Hash
 */
