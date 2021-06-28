const repositoriesContext = require.context(
  // Look for files in the repositories directory
  './repositories',
  // Do not look in subdirectories
  false,
  // Exclude `repository.js`
  /^\.\/(?!repository(\.js)?$).+\.js$/
)

const repositories = {}

repositoriesContext.keys().forEach(fileName => {
  const repositoryName = fileName
    // Remove the "./_" from the beginning
    .replace(/^\.\//, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')

  repositories[repositoryName] = repositoriesContext(fileName).default
})

export const RepositoryFactory = {
  get: name => repositories[name],
}
