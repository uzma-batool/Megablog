import { Account, Client, Databases, ID } from 'appwrite'

const client = new Client()

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1'
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || ''
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || ''
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID || ''

const isPlaceholderValue = (value) => !value || /your-|example|changeme/i.test(value)

if (projectId && !isPlaceholderValue(projectId)) {
  client.setEndpoint(endpoint).setProject(projectId)
} else {
  client.setEndpoint(endpoint)
}

const account = new Account(client)
const databases = new Databases(client)

export const isConfigured = Boolean(
  endpoint &&
    projectId &&
    databaseId &&
    collectionId &&
    !isPlaceholderValue(projectId) &&
    !isPlaceholderValue(databaseId) &&
    !isPlaceholderValue(collectionId),
)

export { account, client, databases, databaseId, collectionId, ID }
