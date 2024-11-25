from flask import Flask, render_template, url_for

app = Flask(__name__)



@app.route("/")
def index():
    return render_template("index.html")

@app.route("/conceito.html")
def conceito():
    return render_template("conceito.html")





#MODULOS#
@app.route("/modulo1.html")
def modulo1():
    return render_template("modulo1.html")

@app.route("/modulo2.html")
def modulo2():
    return render_template ("modulo2.html")

@app.route("/modulo3.html")
def modulo3():
    return render_template("modulo3.html")

@app.route("/modulo4.html")
def modulo4():
    return render_template("modulo4.html")

@app.route("/modulo5.html")
def modulo5():
    return render_template("modulo5.html")
#MODULOS#






#QUESTIONÁRIOS#
@app.route("/quest1.html")
def quest1():
    return render_template("quest1.html")

@app.route("/quest2.html")
def quest2():
    return render_template("quest2.html")

@app.route("/quest3.html")
def quest3():
    return render_template("quest3.html")

@app.route("/quest4.html")
def quest4():
    return render_template("quest4.html")

@app.route("/quest5.html")
def quest5():
    return render_template("quest5.html")
#QUESTIONÁRIOS#


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)