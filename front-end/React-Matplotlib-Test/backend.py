from flask import Flask, Response
import matplotlib.pyplot as plt
import io

app = Flask(__name__)

@app.route('/plot')
def plot():
    # Create a simple plot
    fig, ax = plt.subplots()
    ax.plot([0, 1, 2, 3], [0, 1, 4, 9], marker="o")

    # Save the plot to a bytes buffer
    img_io = io.BytesIO()
    plt.savefig(img_io, format='png')
    img_io.seek(0)

    return Response(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
