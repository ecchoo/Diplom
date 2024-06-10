const courseRepository = require('../repositories/CourseRepository');
const testRepository = require('../repositories/TestRepository');
const practicalTaskRepository = require('../repositories/PracticalTaskRepository');

// class ProgressService {
//     async calculate({ userId, courseId, currentLeassonId, currentPracticalTaskId }) {
//         const course = await courseRepository.getById(courseId);

//         if (!currentLeassonId) return 0

//         if (!course) {
//             throw new Error(`Course with id ${courseId} not found`);
//         }

//         let totalLeassons = 0;
//         let completedLeassons = 0;
//         let totalPracticalTasks = 0;
//         let completedPracticalTasks = 0;
//         let testCompleted = false;
//         const userPracticalTasks = await practicalTaskRepository.getUserPracticalTasks(userId);

//         const isPracticalTaskCompleted = (taskId) => {
//             const isCompleted = userPracticalTasks.some(task => {
//                 return task.practicalTaskId === taskId
//             });

//             return userPracticalTasks && userPracticalTasks.length && isCompleted
//         }


//         // Flatten the leassons and practical tasks to get total counts
//         course.modules.forEach(module => {
//             module.partitions.forEach(partition => {
//                 partition.leassons.forEach(leasson => {
//                     totalLeassons++;
//                     if (leasson.id <= currentLeassonId) {
//                         completedLeassons++;
//                     }
//                     leasson.practicalTasks.forEach(task => {
//                         totalPracticalTasks++;
//                         const isCompleted = isPracticalTaskCompleted(task.id)
//                         if (task.id && isCompleted) {
//                             console.log('task completed', task.id)
//                             completedPracticalTasks++;
//                         }
//                     });
//                 });
//             });
//         });

//         const test = course.test || null;
//         if (test) {
//             const userTest = await testRepository.getUserTest({ testId: test.id, userId });
//             if (userTest) {
//                 testCompleted = true;
//             }
//         }

//         // Calculate progress percentages
//         const leassonProgress = totalLeassons === 0 ? 0 : (completedLeassons / totalLeassons) * 100;
//         const practicalTaskProgress = totalPracticalTasks === 0 ? 0 : (completedPracticalTasks / totalPracticalTasks) * 100;
//         const testProgress = testCompleted ? 100 : 0;

//         // Total progress calculation, assuming equal weight for each component
//         const totalProgress = (leassonProgress + practicalTaskProgress + testProgress) / 3;
//         console.log('completedLeassons', completedLeassons)
//         return totalProgress.toFixed(1)
//     }
// }

class ProgressService {
    async calculate({ userId, courseId, currentLeassonId, currentPracticalTaskId }) {
        const course = await courseRepository.getById(courseId);

        if (!currentLeassonId) return 0;

        if (!course) {
            throw new Error(`Course with id ${courseId} not found`);
        }

        let totalComponents = 1; // По умолчанию один компонент: уроки
        let totalProgressSum = 0;

        let completedLessons = 0;
        let totalLessons = 0;
        let completedPracticalTasks = 0;
        let totalPracticalTasks = 0;
        let testCompleted = false;

        // Получаем прогресс пользователя по практическим заданиям
        const userPracticalTasks = await practicalTaskRepository.getUserPracticalTasks(userId);

        // Функция для проверки завершенности практического задания пользователем
        const isPracticalTaskCompleted = (taskId) => {
            return userPracticalTasks.some(task => task.practicalTaskId === taskId);
        };

        // Подсчитываем количество уроков
        course.modules.forEach(module => {
            module.partitions.forEach(partition => {
                partition.leassons.forEach(lesson => {
                    totalLessons++;
                    if (lesson.id <= currentLeassonId) {
                        completedLessons++;
                    }
                    lesson.practicalTasks.forEach(task => {
                        totalPracticalTasks++;
                        if (isPracticalTaskCompleted(task.id)) {
                            completedPracticalTasks++;
                        }
                    });
                });
            });
        });

        // Если есть практические задания, учитываем их в общем прогрессе
        if (totalPracticalTasks > 0) {
            totalComponents++; // Увеличиваем общее количество компонентов прогресса на 1
        }

        // Проверяем, есть ли тест в курсе
        const test = course.test || null;
        if (test) {
            const userTest = await testRepository.getUserTest({ testId: test.id, userId });
            if (userTest && userTest.completed) {
                testCompleted = true;
                totalComponents++; // Увеличиваем общее количество компонентов прогресса на 1
            }
        }

        // Вычисляем прогресс для уроков
        const lessonProgress = totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

        // Если есть практические задания, вычисляем их прогресс
        let practicalTaskProgress = 0;
        if (totalPracticalTasks > 0) {
            practicalTaskProgress = completedPracticalTasks / totalPracticalTasks * 100;
        }

        // Добавляем прогресс теста к общему прогрессу, если он присутствует в курсе
        if (testCompleted) {
            totalProgressSum += 100; // Прогресс теста всегда 100%
        }

        // Добавляем прогресс уроков и практических заданий к общему прогрессу
        totalProgressSum += lessonProgress + practicalTaskProgress;

        // Вычисляем итоговый прогресс
        const totalProgress = totalProgressSum / totalComponents;

        return totalProgress.toFixed(1); // Округляем до одной десятой
    }
}

module.exports = new ProgressService();
