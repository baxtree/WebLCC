CodeMirror.defineMode("lcc", function() {
	return {
		token : function(stream, state) {
			var ch = stream.next();
			if ( ch == "a") {
				if(stream.peek() == "("){
					return "lcc-keyword";
				}
				else{
					return "lcc-constant";
				}
			}
			else if(ch == "'" && stream.match(/([^\'])*\'/)){
				return "lcc-string";
			}
			else if(ch == "\"" && stream.match(/([^\"])*\"/)){
				return "lcc-string";
			}
			else if(ch == ":" && stream.eat(":")){
				return "lcc-keyword";
			}
			else if(ch == "=" && stream.eat(">") || ch == "<" && stream.eat("=")){
				return "lcc-keyword";
			}
			else if(ch == "-" && stream.eat(">") || ch == "<" && stream.eat("-")){
				return "lcc-keyword";
			}
			else if(ch == ">" && stream.eat("=") || ch == "=" && stream.eat("<")){
				return "lcc-operator";
			}
			else if(ch == "!" && stream.eat("=")){
				return "lcc-operator";
			}
			else if(ch == "=" && stream.eat("=")){
				return "lcc-operator";
			}
			else if(ch == "\&" && stream.eat("\&")){
				return "lcc-keyword";
			}
			else if(ch == "\|" && stream.eat("\|")){
				return "lcc-keyword";
			}
			else if(ch == ">"){
				return "lcc-operator";
			}
			else if(ch == "<"){
				return "lcc-operator";
			}
			else if(ch == "="){
				return "lcc-keyword";
			}
			else if(ch == "."){
				if(stream.peek() == " " && stream.eatSpace() && stream.eol())
					return "lcc-keyword";
				else if(stream.eol())
					return "lcc-keyword";
			}
			else if(/[a-z0-9_]/.test(ch)){
				if(ch == "t" && stream.match("hen")){
					if(stream.peek() == " " && stream.eatSpace() && stream.eol())
						return "lcc-keyword";
					else if(stream.eol())
						return "lcc-keyword";
				}
				else if(ch == "o" && stream.eat("r")){
					if(stream.peek() == " " && stream.eatSpace() && stream.eol())
						return "lcc-keyword";
					else if(stream.eol())
						return "lcc-keyword";
				}
				else if(ch == "n" && stream.match("iob")){
					if(stream.peek() == " " && stream.eatSpace() && stream.eol())
						return "lcc-keyword";
					else if(stream.eol())
						return "lcc-keyword";
				}
				else if(ch == "n" && stream.match("ull") && stream.eatSpace() && stream.peek() == "<"){
					return "lcc-keyword";
				}
				else if(ch == "l" && stream.match("ist") && stream.peek() == "("){
					return "lcc-keyword";
				}
				else if(ch == "p" && stream.match("lays") && stream.peek() == "("){
					return "lcc-keyword";
				}
				else if(ch == "k" && stream.match("nows") && stream.peek() == "("){
					return "lcc-keyword";
				}
				else if(ch == "i" && stream.match("id") && stream.peek() == "("){
					return "lcc-keyword";
				}
				else if(ch == "n" && stream.match("ot") && stream.peek() == "("){
					return "lcc-keyword";
				}
				else if(ch == "_" && stream.eatSpace() && (stream.peek() == ")" || stream.peek() == ",")){
					return "lcc-keyword";
				}
				else{
					stream.eatWhile(/[a-zA-Z0-9_@\.:\/]/);
					return "lcc-constant";
				}
			}
			else if(/[A-Z]/.test(ch)){
				stream.eatWhile(/[a-zA-Z0-9_]/);
				return "lcc-variable";
			}
			else{
				return null;
			}
		}
	}
});

CodeMirror.defineMIME("text/lcc", "lcc");
