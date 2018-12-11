$(function(){

	$.prototype.edit = function(txt){
		$(this).val(txt).trigger("input");
	};

	$.prototype.scroll = function(){
		var pos = $(this).offset().top - 30;
		$("body").animate({
			scrollTop: pos
		}, 500);
	};

	String.prototype.size = function(){
		var res = 0;
		for(var i = 0, len = this.length; i < len; i++){
			if(escape(this.charAt(i)).length > 4) res += 2;
			else res++;
		}
		return res;
	};

	String.prototype.toInt = function(){
		return this.match(/^\d+$/) ? parseInt(this) : 0;
	};

	$("body").on("mousedown", "button", function(){
		$(this).addClass("active");
	}).on("mouseup", "button", function(){
		$(this).removeClass("active");
	}).on("mouseleave", "button", function(){
		$(this).removeClass("active");
	});

	$("body").on("click", ".copy-btn", function(){
		var target = $(this).data("target");
		$(target).select();
		document.execCommand('copy');
	});

	$("body").on("click", ".clear-btn", function(){
		var target = $(this).data("target");
		$(target).edit('');
	});

	$("body").on("click", ".save-btn", function(){
		var target = $(this).data("target");
		var link = document.createElement("a");

		now = new Date();
		year = "" + now.getFullYear();
		month = "" + (now.getMonth() + 1);
		if (month.length == 1) month = "0" + month;
		day = "" + now.getDate();
		if (day.length == 1) day = "0" + day;
		hour = "" + now.getHours();
		if (hour.length == 1) hour = "0" + hour;
		minute = "" + now.getMinutes();
		if (minute.length == 1) minute = "0" + minute;
		second = "" + now.getSeconds();
		if (second.length == 1) second = "0" + second;
		link.download = year + "-" + month + "-" + day + "_" + hour + ":" + minute + ":" + second + ".txt";

		link.href = "data:text/plain,"+encodeURIComponent($(target).val());
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		delete link;
	});

	$(".scroll-top").click(function(){
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});
	$(".scroll-bottom").click(function(){
		var pos = $("html").height();
		$("html,body").animate({
			scrollTop: pos
		}, 500);
	});

	function setTitle(title){
		$("title").html((title ? title + " | " : "") + "Crypto Online");
	}

	/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

	urlParser();
	window.onhashchange=function(e){
		urlParser();
	};

	function urlParser(){
		hash = location.hash.toLowerCase();
		hashes = hash.split("/");
		if(hashes.length < 2 || hashes[0] != "#!"){
			location.hash = "#!/";
			return;
		}

		var maker = new formMaker($(".tool-box"));
		var is_not_found = false;
		switch(hashes[1]){
			case "":
				setTitle();
				maker.addH2("", "", 'Welcome to Crypto Online!');
				maker.addP("", "", 'Please select cipher from the list on the left.');
				maker.addHtml('<img src="./img/bg.png" style="width: 470px; height: 369px;">');
				maker.addP("", "", 'This website optimized for google chrome.');
				maker.addP("", "", 'If you want, you can contact me by: <a href="mailto:plzdonotsay@gmail.com">plzdonotsay@gmail.com</a>');
				break;

			case "encode":
				maker.addPath('/#!/'+hashes[1], "Encode");

				// start encode
				switch(hashes[2]){
					case "", undefined:
						$("#category-encode").scroll();
						break;

					case "url":
						setTitle("URL Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "URL");

						maker.addH2("work-type", "", "URL Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								encodeURIComponent($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								decodeURIComponent($("#before-text").val())
							);
						});
						break;

					case "hex":
						setTitle("Hex Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Hex");

						maker.addH2("work-type", "", "Hex Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								hex.encode($("#before-text").val()).toUpperCase()
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								hex.decode($("#before-text").val())
							);
						});
						break;

					case "uu":
						setTitle("UU Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "UU");

						maker.addH2("work-type", "", "UU Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								uu.encode($("#before-text").val()).toUpperCase()
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								uu.decode($("#before-text").val())
							);
						});
						break;

					case "html":
						setTitle("HTML Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "HTML");

						maker.addH2("work-type", "", "HTML Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								html.encode($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								html.decode($("#before-text").val())
							);
						});
						break;

					case "morse":
						setTitle("Morse Code");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Morse");

						maker.addH2("work-type", "", "Morse Code");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								morse.encode($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								morse.decode($("#before-text").val())
							);
						});
						break;

					case "base32":
						setTitle("Base32 Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Base32");

						maker.addH2("work-type", "", "Base32 Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								base32.encode($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								base32.decode($("#before-text").val())
							);
						});
						break;

					case "base58":
						setTitle("Base58 Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Base58");

						maker.addH2("work-type", "", "Base58 Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								base58.encode($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								base58.decode($("#before-text").val())
							);
						});
						break;

					case "base64":
						setTitle("Base64 Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Base64");

						maker.addH2("work-type", "", "Base64 Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								base64.encode($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								base64.decode($("#before-text").val())
							);
						});
						break;

					case "base85":
						setTitle("Base85 Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Base85");

						maker.addH2("work-type", "", "Base85 Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								base85.encode($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								base85.decode($("#before-text").val())
							);
						});
						break;

					case "utf-8":
						setTitle("UTF-8 Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "UTF-8");

						maker.addH2("work-type", "", "UTF-8 Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								utf8.encode($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								utf8.decode($("#before-text").val())
							);
						});
						break;

					case "utf-16":
						setTitle("UTF-16 Encode");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "UTF-16");

						maker.addH2("work-type", "", "UTF-16 Encode");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("encode-btn", "", "Encode");
						maker.addButton("decode-btn", "", "Decode");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encode-btn").click(function(){
							$("#after-text").edit(
								utf16.encode($("#before-text").val())
							);
						});
						$("#decode-btn").click(function(){
							$("#after-text").edit(
								utf16.decode($("#before-text").val())
							);
						});
						break;

					default:
						is_not_found = true;
						break;
				}
				// end encode
				break;

			case "cipher":
				maker.addPath('/#!/'+hashes[1], "Cipher");

				// start cipher
				switch(hashes[2]){
					case "", undefined:
						$("#category-cipher").scroll();
						break;

					case "caesar":
						setTitle("Caesar Cipher");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Caesar");

						maker.addH2("work-type", "", "Caesar Cipher");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Key", false, false, "3", true);
						maker.addButton("encipher-btn", "", "Encipher");
						maker.addButton("decipher-btn", "", "Decipher");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encipher-btn").click(function(){
							$("#after-text").edit(
								caesar.encipher($("#before-text").val(), $("#key-text").val().toInt())
							);
						});
						$("#decipher-btn").click(function(){
							$("#after-text").edit(
								caesar.decipher($("#before-text").val(), $("#key-text").val().toInt())
							);
						});
						break;

					case "keyword":
						setTitle("Keyword Cipher");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Keyword");

						maker.addH2("work-type", "", "Keyword Cipher");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Key", false, false, "", true);
						$("#key-text").before('<code id="key-exam">ABCDEFGHIJKLMNOPQRSTUVWXYZ</code>');
						maker.addButton("encipher-btn", "", "Encipher");
						maker.addButton("decipher-btn", "", "Decipher");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encipher-btn").click(function(){
							$("#after-text").edit(
								keyword.encipher($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#decipher-btn").click(function(){
							$("#after-text").edit(
								keyword.decipher($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#key-text").on("input", function(){
							$("#key-exam").html(keyword.getKey($(this).val()));
						});
						break;

					case "vigenere":
						setTitle("Vigenere Cipher");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Vigenere");

						maker.addH2("work-type", "", "Vigenere Cipher");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Key", false, false, "", true);
						maker.addButton("encipher-btn", "", "Encipher");
						maker.addButton("decipher-btn", "", "Decipher");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encipher-btn").click(function(){
							$("#after-text").edit(
								vigenere.encipher($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#decipher-btn").click(function(){
							$("#after-text").edit(
								vigenere.decipher($("#before-text").val(), $("#key-text").val())
							);
						});
						break;

					default:
						is_not_found = true;
						break;
				}
				// end cipher
				break;

			case "encrypt":
				maker.addPath('/#!/'+hashes[1], "Encrypt");

				// start encrypt
				switch(hashes[2]){
					case "", undefined:
						$("#category-encrypt").scroll();
						break;

					case "aes":
						setTitle("AES Encrypt");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "AES");

						maker.addH2("work-type", "", "AES Encrypt");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Key", false, false, "", true);
						maker.addButton("encrypt-btn", "", "Encrypt");
						maker.addButton("decrypt-btn", "", "Decrypt");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.AES.encrypt($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#decrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.enc.Utf8.stringify(
									CryptoJS.AES.decrypt($("#before-text").val(), $("#key-text").val())
								)
							);
						});
						break;

					case "rc4":
						setTitle("RC4 Encrypt");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "RC4");

						maker.addH2("work-type", "", "RC4 Encrypt");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Key", false, false, "", true);
						maker.addButton("encrypt-btn", "", "Encrypt");
						maker.addButton("decrypt-btn", "", "Decrypt");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.RC4.encrypt($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#decrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.enc.Utf8.stringify(
									CryptoJS.RC4.decrypt($("#before-text").val(), $("#key-text").val())
								)
							);
						});
						break;

					case "des":
						setTitle("DES Encrypt");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "DES");

						maker.addH2("work-type", "", "DES Encrypt");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Key", false, false, "", true);
						maker.addButton("encrypt-btn", "", "Encrypt");
						maker.addButton("decrypt-btn", "", "Decrypt");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.DES.encrypt($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#decrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.enc.Utf8.stringify(
									CryptoJS.DES.decrypt($("#before-text").val(), $("#key-text").val())
								)
							);
						});
						break;

					case "blowfish":
						setTitle("Blowfish Encrypt");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Blowfish");

						maker.addH2("work-type", "", "Blowfish Encrypt");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Key", false, false, "", true);
						maker.addButton("encrypt-btn", "", "Encrypt");
						maker.addButton("decrypt-btn", "", "Decrypt");
						maker.addButton("", "swap-btn", "Swap");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$("#encrypt-btn").click(function(){
							$("#after-text").edit(
								blowfish.encrypt($("#before-text").val(), $("#key-text").val(), {cipherMode: 0, outputType: 0})
							);
						});
						$("#decrypt-btn").click(function(){
							$("#after-text").edit(
								blowfish.decrypt($("#before-text").val(), $("#key-text").val(), {cipherMode: 0, outputType: 0})
							);
						});
						break;

				}
				// end encrypt
				break;

			case "hash":
				maker.addPath('/#!/'+hashes[1], "Hash");

				// start hash
				switch(hashes[2]){
					case "", undefined:
						$("#category-hash").scroll();
						break;

					case "crc16":
						setTitle("CRC16 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "CRC16");

						maker.addH2("work-type", "", "CRC16 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								crc16($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "crc32":
						setTitle("CRC32 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "CRC32");

						maker.addH2("work-type", "", "CRC32 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								crc32($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "adler32":
						setTitle("Adler32 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Adler32");

						maker.addH2("work-type", "", "Adler32 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								adler32.hex($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "md2":
						setTitle("MD2 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "MD2");

						maker.addH2("work-type", "", "MD2 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								md2($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "md4":
						setTitle("MD4 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "MD4");

						maker.addH2("work-type", "", "MD4 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								md4($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "md5":
						setTitle("MD5 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "MD5");

						maker.addH2("work-type", "", "MD5 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								md5.hex($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "sha1":
						setTitle("SHA1 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "SHA1");

						maker.addH2("work-type", "", "SHA1 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								sha1.hex($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "sha224":
						setTitle("SHA224 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "SHA224");

						maker.addH2("work-type", "", "SHA224 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								sha224.hex($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "sha256":
						setTitle("SHA256 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "SHA256");

						maker.addH2("work-type", "", "SHA256 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								sha256.hex($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "sha384":
						setTitle("SHA384 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "SHA384");

						maker.addH2("work-type", "", "SHA384 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								sha384.hex($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "sha512":
						setTitle("SHA512 Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "SHA512");

						maker.addH2("work-type", "", "SHA512 Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								sha512.hex($("#before-text").val()).toUpperCase()
							);
						});
						break;

					case "whirlpool":
						setTitle("Whirlpool Hash");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Whirlpool");

						maker.addH2("work-type", "", "Whirlpool Hash");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("hash-btn", "", "Hash");
						maker.addTextarea("after-text", "", "Result", "3", false, "", true);
						$("html,body").scroll();

						$("#hash-btn").click(function(){
							$("#after-text").edit(
								Whirlpool($("#before-text").val()).toUpperCase()
							);
						});
						break;

					default:
						is_not_found = true;
						break;
				}
				// end hash
				break;

			case "misc":
				maker.addPath('/#!/'+hashes[1], "Misc");

				// start misc
				switch(hashes[2]){
					case "", undefined:
						$("#category-misc").scroll();
						break;

					case "uppercase":
						setTitle("Uppercase");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Uppercase");

						maker.addH2("work-type", "", "Uppercase");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("convert", "", "Convert");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$('#convert').click(function(){
							$("#after-text").edit(
								$("#before-text").val().toUpperCase()
							);
						});
						break;

					case "lowercase":
						setTitle("Lowercase");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Lowercase");

						maker.addH2("work-type", "", "Lowercase");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("convert", "", "Convert");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$('#convert').click(function(){
							$("#after-text").edit(
								$("#before-text").val().toLowerCase()
							);
						});
						break;

					case "capitalize":
						setTitle("Capitalize");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Capitalize");

						maker.addH2("work-type", "", "Capitalize");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("convert", "", "Convert");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$('#convert').click(function(){
							$("#after-text").edit(
								strCapitalize($("#before-text").val())
							);
						});
						break;

					case "reverse":
						setTitle("Reverse");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Reverse");

						maker.addH2("work-type", "", "Reverse");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("convert", "", "Convert");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$('#convert').click(function(){
							$("#after-text").edit(
								strReverse($("#before-text").val())
							);
						});
						break;

					case "shuffle":
						setTitle("Shuffle");
						maker.addPath('/#!/'+hashes[1]+'/'+hashes[2], "Shuffle");

						maker.addH2("work-type", "", "Shuffle");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addButton("convert", "", "Convert");
						maker.addTextarea("after-text", "", "Result", "12", false, "", true);
						$("html,body").scroll();

						$('#convert').click(function(){
							$("#after-text").edit(
								strShuffle($("#before-text").val())
							);
						});
						break;

					default:
						is_not_found = true;
						break;
				}
				// end misc
				break;

			default:
				is_not_found = true;
				break;
		}
		if(is_not_found){
			setTitle("Under Construction");
			maker.addH2("", "", 'Under Construction');
			maker.addP("", "", 'Plz select another cipher at the left list.');
			$("html,body").scroll();
		}

		$(".swap-btn").click(function(){
			var after = $("#after-text").val(), before = $("#before-text").val();
			$("#after-text").edit(before);
			$("#before-text").edit(after);
		});

		$(".category-box .group ul li a").each(function(key, val){
			if($(this).attr("href") == "/" + hash){
				$(this).parent().addClass("active");
			}else{
				$(this).parent().removeClass("active");
			}
		});

	}

	/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

	function formMaker (target) {
		this.target = target;
		this.target.html('');

		this.addHtml = function(html){
			this.target.append(
				html
			);
		};

		this.addH2 = function(id, cls, value){
			this.target.append(
				'<h2'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</h2>'
			);
		};

		this.addSpan = function(id, cls, value){
			this.target.append(
				'<span'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</span>'
			);
		};

		this.addP = function(id, cls, value){
			this.target.append(
				'<p'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</p>'
			);
		};

		this.addDiv = function(id, cls, value){
			this.target.append(
				'<div'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</div>'
			);
		};

		this.addLink = function(id, cls, href, value){
			this.target.append(
				'<a'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
					(href ? ' href="'+href+'"' : '') +
				'>'+
					value + 
				'</a>'
			);
		};

		this.addPath = function(href, value){
			this.target.append(
				'<span class="path"></span>' +
				'<a'+
					(href ? ' href="'+href+'"' : '') +
				'>'+
					value + 
				'</a>'
			);
		};

		this.addTextarea = function(id, cls, title, rows, autofocus, value, toolbar){
			if(title){
				this.target.append(
					'<div class="title">' +
						title +
					'</div>'
				);
			}
			if(rows){
				this.target.append(
					'<textarea'+
						(id ? ' id="'+id+'"' : '') +
						(cls ? ' class="'+cls+'"' : '') +
						(rows ? ' rows="'+rows+'"' : '') +
						(autofocus ? ' autofocus' : '') +
					'>'+
					value + 
					'</textarea>'
				);
			}else{
				this.target.append(
					'<input type="text"'+
						(id ? ' id="'+id+'"' : '') +
						(cls ? ' class="'+cls+'"' : '') +
						(autofocus ? ' autofocus' : '') +
						(value ? ' value="'+value+'"' : '') +
					'>'
				);
			}
			if(id && autofocus){
				$("#"+id).focus();
			}
			if(id && toolbar){
				this.target.append(
					'<div class="toolbar">' +
						'<span title="Length of text">Length: <span id="'+id+'-length">'+value.length+'</span></span>' +
						' | ' +
						'<span title="Size of text (bytes)">Size: <span id="'+id+'-size">'+value.size()+'</span></span>' +
						' | ' +
						'<a class="copy-btn" data-target="#'+id+'" title="Copy to clipboard">Copy</a>' +
						' | ' +
						'<a class="clear-btn" data-target="#'+id+'" title="Clear to text">Clear</a>' +
						' | ' +
						'<a class="save-btn" data-target="#'+id+'" title="Save to file">Save</a>' +
					'</div>'
				);
				$("#"+id).on("input",function(){
					var txt = $(this).val();
					$("#"+id+"-length").html(txt.length);
					$("#"+id+"-size").html(txt.size());
				});
			}
		};

		this.addButton = function(id, cls, value){
			this.target.append(
				'<button'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</button>'
			);
		};
	}

});
