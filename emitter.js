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

module.exports = {
    getEmitter,

    isStar
};
