const practicalTaskRepository = require("../repositories/PracticalTaskRepository");
const courseRepository = require("../repositories/CourseRepository");
const progressService = require("./ProgressService");
const userRepository = require("../repositories/UserRepository");

class PracticalTaskService {
    async create({ condition, leassonId, courseId }) {
        const newPracticalTask = await practicalTaskRepository.create({ condition, leassonId })

        return newPracticalTask
    }

    async submit({ filePath, userId, practicalTaskId, courseId }) {
        const course = await courseRepository.getById(courseId);

        if (!course) {
            throw new Error(`Course with id ${courseId} not found`);
        }

        await practicalTaskRepository.createUserPracticalTask({ filePath, userId, practicalTaskId });

        return { filePath, userId, practicalTaskId, courseId };
    }

    async delete({ practicalTaskId, courseId }) {
        // console.log(courseId);
        const course = await courseRepository.getById(courseId);
        if (!course) {
            throw new Error(`Course with id ${courseId} not found`);
        }

        let tasks = [];

        course.modules.forEach(module => {
            module.partitions.forEach(partition => {
                partition.leassons.forEach(lesson => {
                    lesson.practicalTasks.forEach(task => {
                        tasks.push(task);
                    });
                });
            });
        });

        const courseUsers = await userRepository.getCourseUsers(courseId);
        if (courseUsers && courseUsers.length) {
            for (const { user } of courseUsers) {
                const userCourseProgress = user.userProgress.find(progress => progress.courseId == courseId);

                if (userCourseProgress) {
                    let nextTaskId = null;
                    console.log('currentPracticalTaskId', userCourseProgress.currentPracticalTaskId)
                    console.log('practicalTaskId', practicalTaskId)

                    console.log(userCourseProgress.currentPracticalTaskId === practicalTaskId)
                    if (userCourseProgress.currentPracticalTaskId === practicalTaskId) {
                        const taskIndex = tasks.findIndex(task => task.id === practicalTaskId);
                        console.log('taskIndex', taskIndex)
                        if (taskIndex !== -1) {
                            if (taskIndex < tasks.length - 1) {
                                nextTaskId = tasks[taskIndex + 1].id;
                            } else if (tasks.length === 1) {
                                nextTaskId = null;
                            } else {
                                nextTaskId = tasks[taskIndex - 1].id;
                            }
                        }
                    }

                    await userRepository.updateUserProgress({
                        userId: user.id,
                        courseId: courseId,
                        currentPracticalTaskId: nextTaskId
                    });
                }
            }
        }

        await practicalTaskRepository.delete(practicalTaskId);
    }

}

module.exports = new PracticalTaskService();
