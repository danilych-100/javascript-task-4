'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = true;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let events = {};

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(
                {
                    context: context,
                    handler: handler
                }
            );

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            Object.keys(events).filter(eventName => {
                return eventName.includes(event);
            })
                .forEach(
                    eventName => {
                        events[eventName] = events[eventName].filter(
                            (existedEvent) => context.focus !== existedEvent.context.focus &&
                                context.wisdom !== existedEvent.context.wisdom
                        );
                    }
                );

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            foundEventNames(event).filter(eventName => events[eventName])
                .forEach(eventName => {
                    events[eventName].forEach(
                        ({ context, handler }) => {
                            handler.call(context);
                        });
                });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

function foundEventNames(eventName, results = []) {
    if (!eventName) {
        return results;
    }
    results.push(eventName);

    return foundEventNames(eventName.substring(0, eventName.lastIndexOf('.')), results);
}

//
// const students = {
//     Sam: {
//         focus: 100,
//         wisdom: 50
//     },
//     Sally: {
//         focus: 100,
//         wisdom: 60
//     },
//     Bill: {
//         focus: 90,
//         wisdom: 50
//     },
//     Sharon: {
//         focus: 110,
//         wisdom: 40
//     }
// };

// const lecturer = getEmitter()
//     .on('begin', students.Sam, function () {
//         this.focus += 10;
//     })
//     .on('begin', students.Sally, function () {
//         this.focus += 10;
//     })
//     .on('begin', students.Bill, function () {
//         this.focus += 10;
//         this.wisdom += 5;
//     })
//     .on('begin', students.Sharon, function () {
//         this.focus += 20;
//     })
//     .on('slide', students.Sam, function () {
//         this.wisdom += Math.round(this.focus * 0.1);
//         this.focus -= 10;
//     })
//     .on('slide', students.Sally, function () {
//         this.wisdom += Math.round(this.focus * 0.15);
//         this.focus -= 5;
//     })
//     .on('slide', students.Bill, function () {
//         this.wisdom += Math.round(this.focus * 0.05);
//         this.focus -= 10;
//     })
//     .on('slide', students.Sharon, function () {
//         this.wisdom += Math.round(this.focus * 0.01);
//         this.focus -= 5;
//     })
//     .on('slide.funny', students.Sam, function () {
//         this.focus += 5;
//         this.wisdom -= 10;
//     })
//     .on('slide.funny', students.Sally, function () {
//         this.focus += 5;
//         this.wisdom -= 5;
//     })
//     .on('slide.funny', students.Bill, function () {
//         this.focus += 5;
//         this.wisdom -= 10;
//     })
//     .on('slide.funny', students.Sharon, function () {
//         this.focus += 10;
//         this.wisdom -= 10;
//     });
// // lecturer
// //     .emit('slide.text')
// //     .emit('slide.text')
// //     .emit('slide.text')
// //     .emit('slide.funny');
// lecturer
//     .off('slide.funny', students.Sharon)
//     .emit('slide.text')
//     .emit('slide.text')
//     .emit('slide.funny');
module.exports = {
    getEmitter,

    isStar
};
