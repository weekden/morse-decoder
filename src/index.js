const MORSE_TABLE = {
	'.-': 'a',
	'-...': 'b',
	'-.-.': 'c',
	'-..': 'd',
	'.': 'e',
	'..-.': 'f',
	'--.': 'g',
	'....': 'h',
	'..': 'i',
	'.---': 'j',
	'-.-': 'k',
	'.-..': 'l',
	'--': 'm',
	'-.': 'n',
	'---': 'o',
	'.--.': 'p',
	'--.-': 'q',
	'.-.': 'r',
	'...': 's',
	'-': 't',
	'..-': 'u',
	'...-': 'v',
	'.--': 'w',
	'-..-': 'x',
	'-.--': 'y',
	'--..': 'z',
	'.----': '1',
	'..---': '2',
	'...--': '3',
	'....-': '4',
	'.....': '5',
	'-....': '6',
	'--...': '7',
	'---..': '8',
	'----.': '9',
	'-----': '0',
};

function decode(expr) {
    // Проверяем на уловие что все элемены имеют длинну 10 символов
	if (expr.length === 0 || expr.length % 10 !== 0) return [];
    // В новый массив пушим чанки длинною в 10 символов, тем самым получая каждый эллемент
	let newArr = [];
	for (let i = 0; i < expr.length; i++) {
		if (i % 10 !== 0) continue;
		newArr.push(expr.slice(i, i + 10)).toString();
	}
    // Перебираем массив чанок и зменяем "**********" на пробелы и убирае лишнее нули в чанках где оги идут в начале, пока не дойдем до первой 1
	newArr = newArr.map(item => {
		if (item === '**********') return " ";
		let splitItem = item.split('');
		while (splitItem[0] === '0') {
			splitItem.shift();
		}
		return splitItem;
	});
    // В каждой чанке создаем еще подмассивы по 2 едемента и соеденяем их в один на выходе получаем чанки с 10 и 11
	let slicedArr = [];
	const chunk = 2;
	newArr.forEach(item => {
		let chunkArr = [];
		for (let j = 0; j < item.length; j += chunk) {
			if (item === " ") continue;
			chunkArr.push(item.slice(j, j + chunk).join(""));
		}
		slicedArr.push(chunkArr);
	});
    // Проверяем чанки с подмассивами и преобразовываем их в "." "-" и соеденяем в рдну строку
	slicedArr = slicedArr.map(item => {
		return item.map(elem => {
				if (elem === "10") {
					return ".";
				} else if (elem === "11") {
					return "-";
				} else {
					return " ";
				}
			})
			.join("");
	});
	
    // Изменяем наш массив с строковыми элементами согласно элементам таблицы декодировки  случае отсутствия эллемента возвращаем пробел и соеденяемв строку
	slicedArr = slicedArr.map(elem => {
		if (elem in MORSE_TABLE) {
			return MORSE_TABLE[elem];
		}

		return " ";
	}).join("");
    return slicedArr;
    
}


module.exports = {
    decode
}
