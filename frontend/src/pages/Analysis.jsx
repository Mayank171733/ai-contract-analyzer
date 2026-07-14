import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Analysis() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    getAnalysis();
  }, []);


  const getAnalysis = async () => {
  try {

    setLoading(true);

    const response = await api.get(`/analysis/${id}`);

    console.log("Analysis data:", response.data.analysis);

    setAnalysis(response.data.analysis);

  } catch(error){

    console.error(
      "Fetch analysis error:",
      error.response?.data || error.message
    );

    setAnalysis(null);

  } finally {

    setLoading(false);

  }
};


  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);

      await api.post(`/analysis/${id}`);

      await getAnalysis();

      alert("Analysis completed");

    } catch (error) {
      console.log(error);
      alert("Analysis failed");

    } finally {
      setAnalyzing(false);
    }
  };


  if (loading) {
    return <h2>Loading...</h2>;
  }


  return (
    <div style={{ padding: "30px" }}>

      <h1>
        Contract Analysis
      </h1>


      {!analysis ? (

        <button onClick={handleAnalyze}>
          {
            analyzing
            ? "Analyzing..."
            : "Analyze Contract"
          }
        </button>

      ) : (

        <div>

          <h2>
            Risk Score:
            {" "}
            {analysis.riskScore}/10
          </h2>


          <h3>
            Summary
          </h3>

          <p>
            {analysis.summary}
          </p>


          <h3>
            Important Clauses
          </h3>

          <ul>
            {
              analysis.clauses?.map(
                (item,index)=>(
                  <li key={index}>
                    {item.name ? `${item.name}: ` : ""}{item.description || JSON.stringify(item)}
                  </li>
                )
              )
            }
          </ul>



          <h3>
            Risks
          </h3>

          <ul>
            {
              analysis.risks?.map(
                (item,index)=>(
                  <li key={index}>
                    {item.description || JSON.stringify(item)} {item.severity ? `(${item.severity})` : ""}
                  </li>
                )
              )
            }
          </ul>



          <h3>
            Recommendations
          </h3>

          <ul>
            {
              analysis.recommendations?.map(
                (item,index)=>(
                  <li key={index}>
                    {item.description || JSON.stringify(item)}
                  </li>
                )
              )
            }
          </ul>


        </div>

      )}

    </div>
  );
}


export default Analysis;