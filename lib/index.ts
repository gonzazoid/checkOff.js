// DONE хочу для массива указывать формат элемента, вот так:
// checkOff(req.body, {mailList: [{from: [], stamp: '', subject: '', title: ''}], folder: ''})
// DONE если указано несколько объектов в массиве - значит элемент массива может быть одним из указанных типов
// every на пустом массиве дает true
// some на пустом массиве дает false но проверка length не дает его взвать на пустом массиве
export const checkOff = function(target: any, pattern: any): boolean{
    // console.log(target, pattern);
    // то есть для string, number - возвращаем сравнение с типом паттерна
    // TODO работа с символами требует проработки
    const Ttarget = typeof target;
    const Tpattern = typeof pattern;
    return  ![Ttarget, Tpattern].includes('undefined')
            && (pattern === null
                || (Tpattern === Ttarget
                    && (['string', 'number', 'boolean', 'symbol', 'function'].includes(Ttarget)
                        || (Array.isArray(pattern)
                            ? Array.isArray(target)
                                && (!pattern.length
                                    || target.every((entry: any) => {
                                        return pattern.some((pattern: any) => {
                                            return checkOff(entry, pattern);
                                        });
                                    })
                                )
                            : Object.keys(pattern).every((key: string) => {
                                return checkOff(target[key], pattern[key]);
                            }) 
                        )
                    )
                )
            );
};
