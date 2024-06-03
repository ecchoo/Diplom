export const transformCourse = (course) => {
    const { modules, partitions, leassons, ...courseInfo } = course

    const partitionsCopy = partitions.map(partition => ({ ...partition, leassons: [] }))
    const modulesCopy = modules.map(module => ({ ...module, partitions: [] }))

    leassons.forEach(leasson => {
        const partition = partitionsCopy[leasson.partition]
        if (partition) {
            partition.leassons.push(leasson)
        }
    })

    partitionsCopy.forEach(partition => {
        const module = modulesCopy[partition.module]
        if (module) {
            module.partitions.push(partition)
        }
    })

    return { ...courseInfo, modules: modulesCopy }
}
