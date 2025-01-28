

// import { useEffect, useRef, useState } from "react";
// import { SWATCHES } from "../../constrants";
// import { ColorSwatch, Group } from "@mantine/core";
// import { Button } from "../../components/ui/button";

// import Draggable from 'react-draggable';

// import axios from "axios";
// import * as MathJax from 'mathjax';


// interface Response {
//   expr: string;
//   result: string;
//   assign: boolean;
// }

// interface GeneratedResult {
//   expression: string;
//   answer: string;
// }

// export default function Home() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("rgb(255,255,255)");
//   const [reset, setReset] = useState(false);
//   const [result, setResult] = useState<GeneratedResult>();
//   const [latexExpression , setLatexExpression]  = useState<Array<string>>([]);

//   const [latexPosition , setLatexPosition] = useState({x : 10 , y :100});
//   const [dictOfvar, setDictOfVars] = useState({});

//   useEffect(() => {
//     if (reset) {
//       resetCanvas();
//       setLatexExpression([]);
//       setResult(undefined);
//       setDictOfVars({});
//       setReset(false);
//     }
//   }, [reset]);

//   useEffect(() => {

//     if(latexExpression.length > 0 && window.MathJax){
//         setTimeout(() => {
//             window.MathJax.Hub.Queue(["Typeset" , window.MathJax.Hub]);
//         } , 0)
//     }

//   } , [latexExpression])

//   useEffect(() => {

//     if(result){
//         renderLatexToCanvas(result.expression . result.answer);
//     }

//   } , [result]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         canvas.width = rect.width;
//         canvas.height = rect.height;
//         ctx.lineCap = "round";
//         ctx.lineWidth = 3;
//       }
//     }

//     const script = document.createElement('script');
//     script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/config/TeX-MML-AM_CHTML.min.js"

//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {

//         window.MathJax.Hub.Config({

//             tex2jax: {

//                 inlineMath : [['$', '$'], ['\\(', '\\)']],
//                 // displayMath : [['$$', '$$'], ['\\[', '\\]']],
//                 // processEscapes: true
//             }
//         })
//     };

//     return() => {
//         document.head.removeChild(script);
//     }
//   }, []);


//   const renderLatexToCanvas =  (expression : string , answer : string) => {

//     const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
//     setLatexExpression([...latexExpression , latex])

//     const canvas = canvasRef.current;
//     if(canvas){
//         const ctx = canvas.getContext('2d');
//         if(ctx){
//             ctx.clearRect(0 , 0 , canvas.width , canvas.height)
//         }
//     }
//   };

//   const sendData = async () => {
//     const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8900";
//     console.log('sending data...', `${baseUrl}/calculator/calculate`);
    
//     try {
//       const canvas = canvasRef.current;
//       if (canvas) {
//         const response = await axios({
//           method: "post",
//           url: `${baseUrl}/calculator/calculate`,
//           data: {
//             image: canvas.toDataURL("image/png"),
//             dict_of_vars: dictOfvar,
//           },
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
        
//         // console.log("Response:", response.data);
//         // if (response.data.data) {
//         //   setResult(response.data.data);
//         // }
//         const resp = response.data.data;
//         resp.data.forEach((data : Response) => {
//             if(data.assign){
//                 // 65 * 5
//                 setDictOfVars({
//                     ...dictOfvar,
//                     [data.expr] : data.result
//                 })
//             }
//         })
//       }
      
//       const ctx = canvas.getContext('2d');
//       const imageData = ctx.getImageData(0 , 0 , canvas.width , canvas.heigh);
  
//       let minX = canvas.width , minY = canvas.height , maxX = 0 , maxY = 0;
  
//       for(let y = 0; y < canvas.height; y++){
//         for(let x = 0; x < canvas.width; x++){

//             if(imageData.data[(y * canvas.width + x) * 4 + 3]> 0){

//                 if(x < minX) minX = x;
//                 if(x > minX) minX = x;
//                 if(y < minY) minY = y;
//                 if(y < minY) minY = y;

//             }
//         }
          
//       }
//       const centerX = (minX + maxX) / 2 ;
//       const centerY = (minY + maxY) / 2 ;

//       setLatexPosition({x : centerX  , y : centerY});

//       resp.data.data.forEach(data : Response) => {
//         setTimeout(() => {

//             setResult({
//                 expression : data.expr,
//                 answer.data.result,
//             })
//         }, 200)
//       }
//     }
//     catch (error) {
//         console.error("Error sending data:", error);
//       }
    
    

//   };

//   const resetCanvas = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.style.background = "black";
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         ctx.beginPath();
//         ctx.moveTo(
//           e.clientX - rect.left,
//           e.clientY - rect.top
//         );
//         setIsDrawing(true);
//       }
//     }
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         ctx.strokeStyle = color;
//         ctx.lineTo(
//           e.clientX - rect.left,
//           e.clientY - rect.top
//         );
//         ctx.stroke();
//       }
//     }
//   };

//   return (
//     <div className="h-screen w-full relative">
//       <div className="grid grid-cols-3 gap-1 absolute top-0 left-0 w-full z-10 bg-white p-4">
//         <Button
//           onClick={() => setReset(true)}
//           className="bg-black text-white"
//           variant="default">
//           Reset
//         </Button>

//         <Group>
//           {SWATCHES.map((swatchColor: string) => (
//             <ColorSwatch
//               key={swatchColor}
//               color={swatchColor}
//               onClick={() => setColor(swatchColor)}
//             />
//           ))}
//         </Group>

//         <Button
//           onClick={sendData}
//           className="bg-black text-white"
//           variant="default">
//           Calculate
//         </Button>
//       </div>

//       <canvas
//         ref={canvasRef}
//         className="w-full h-full"
//         onMouseDown={startDrawing}
//         onMouseOut={stopDrawing}
//         onMouseUp={stopDrawing}
//         onMouseMove={draw}
//       />

//       <latexPosition && latexExpression.map(latex , index) => {
//         <Draggable 
//             key={index}
//             defaultPosition={latextposition}
//             onStop={(e , data) => setLatexPosition({x : data.x , y : data.y})}
//             >
//             <div 
//             className="absolute text-white">
//                 <div className="latex-content">{latex}</div>
//             </div>
//             </Draggable>

//       }
//     </div>
//   );
// }


//<---------upper wale code ka modified version hai ye

// import { useEffect, useRef, useState } from "react";
// import { SWATCHES } from "../../constrants";
// import { ColorSwatch, Group } from "@mantine/core";
// import { Button } from "../../components/ui/button";
// import Draggable from 'react-draggable';
// import axios from "axios";

// interface Response {
//   expr: string;
//   result: string;
//   assign: boolean;
// }

// interface GeneratedResult {
//   expression: string;
//   answer: string;
// }

// interface Position {
//   x: number;
//   y: number;
// }

// // Add MathJax to window type
// declare global {
//   interface Window {
//     MathJax: any;
//   }
// }

// export default function Home() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("rgb(255,255,255)");
//   const [reset, setReset] = useState(false);
//   const [result, setResult] = useState<GeneratedResult>();
//   const [latexExpression, setLatexExpression] = useState<string[]>([]);
//   const [latexPosition, setLatexPosition] = useState<Position>({ x: 10, y: 100 });
//   const [dictOfVar, setDictOfVar] = useState<Record<string, string>>({});

//   useEffect(() => {
//     if (reset) {
//       resetCanvas();
//       setLatexExpression([]);
//       setResult(undefined);
//       setDictOfVar({});
//       setReset(false);
//     }
//   }, [reset]);

//   useEffect(() => {
//     if (latexExpression.length > 0 && window.MathJax) {
//       setTimeout(() => {
//         window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
//       }, 0);
//     }
//   }, [latexExpression]);

//   useEffect(() => {
//     if (result) {
//       renderLatexToCanvas(result.expression, result.answer);
//     }
//   }, [result]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         canvas.width = rect.width;
//         canvas.height = rect.height;
//         ctx.lineCap = "round";
//         ctx.lineWidth = 3;
//       }
//     }

//     const script = document.createElement('script');
//     script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.MathJax.Hub.Config({
//         tex2jax: {
//           inlineMath: [['$', '$'], ['\\(', '\\)']],
//         }
//       });
//     };

//     return () => {
//       if (script.parentNode) {
//         script.parentNode.removeChild(script);
//       }
//     };
//   }, []);

//   const renderLatexToCanvas = (expression: string, answer: string) => {
//     const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
//     setLatexExpression([...latexExpression, latex]);

//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const sendData = async () => {
//     const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8900";
    
//     try {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const ctx = canvas.getContext('2d');
//       if (!ctx) return;

//       const response = await axios({
//         method: "post",
//         url: `${baseUrl}/calculator/calculate`,
//         data: {
//           image: canvas.toDataURL("image/png"),
//           dict_of_vars: dictOfVar,
//         },
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       const resp = response.data;
      
//       if (resp.data && Array.isArray(resp.data)) {
//         resp.data.forEach((data: Response) => {
//           if (data.assign) {
//             setDictOfVar(prev => ({
//               ...prev,
//               [data.expr]: data.result
//             }));
//           }
//         });

//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         let minX = canvas.width;
//         let minY = canvas.height;
//         let maxX = 0;
//         let maxY = 0;

//         for (let y = 0; y < canvas.height; y++) {
//           for (let x = 0; x < canvas.width; x++) {
//             if (imageData.data[(y * canvas.width + x) * 4 + 3] > 0) {
//               minX = Math.min(minX, x);
//               maxX = Math.max(maxX, x);
//               minY = Math.min(minY, y);
//               maxY = Math.max(maxY, y);
//             }
//           }
//         }

//         const centerX = (minX + maxX) / 2;
//         const centerY = (minY + maxY) / 2;
//         setLatexPosition({ x: centerX, y: centerY });

//         resp.data.forEach((data: Response) => {
//           setTimeout(() => {
//             setResult({
//               expression: data.expr,
//               answer: data.result,
//             });
//           }, 200);
//         });
//       }
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   const resetCanvas = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.style.background = "black";
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         ctx.beginPath();
//         ctx.moveTo(
//           e.clientX - rect.left,
//           e.clientY - rect.top
//         );
//         setIsDrawing(true);
//       }
//     }
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         ctx.strokeStyle = color;
//         ctx.lineTo(
//           e.clientX - rect.left,
//           e.clientY - rect.top
//         );
//         ctx.stroke();
//       }
//     }
//   };

//   return (
//     <div className="h-screen w-full relative">
//       <div className="grid grid-cols-3 gap-1 absolute top-0 left-0 w-full z-10 bg-white p-4">
//         <Button
//           onClick={() => setReset(true)}
//           className="bg-black text-white"
//           variant="default">
//           Reset
//         </Button>

//         <Group>
//           {SWATCHES.map((swatchColor: string) => (
//             <ColorSwatch
//               key={swatchColor}
//               color={swatchColor}
//               onClick={() => setColor(swatchColor)}
//             />
//           ))}
//         </Group>

//         <Button
//           onClick={sendData}
//           className="bg-black text-white"
//           variant="default">
//           Calculate
//         </Button>
//       </div>

//       <canvas
//         ref={canvasRef}
//         className="w-full h-full"
//         onMouseDown={startDrawing}
//         onMouseOut={stopDrawing}
//         onMouseUp={stopDrawing}
//         onMouseMove={draw}
//       />

//       {latexPosition && latexExpression.map((latex, index) => (
//         <Draggable
//           key={index}
//           defaultPosition={latexPosition}
//           onStop={(e, data) => setLatexPosition({ x: data.x, y: data.y })}
//         >
//           <div className="absolute text-white">
//             <div className="latex-content">{latex}</div>
//           </div>
//         </Draggable>
//       ))}
//     </div>
//   );
// }





















//<------------ This works but some time kaam karta hai ye code ---------------------------------->





import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Draggable from 'react-draggable';
import { Button } from "../../components/ui/button";
import { SWATCHES } from "../../constrants";

interface CalculationResponse {
  expr: string;
  result: number | string;
  assign?: boolean;
}

interface LatexResult {
  latex: string;
  position: { x: number; y: number };
}

export default function Calculator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#FFFFFF");
  const [latexResults, setLatexResults] = useState<LatexResult[]>([]);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const setupMathJax = () => {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML.js";
      script.async = true;
      
      script.onload = () => {
        window.MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
            processEscapes: true
          },
          "HTML-CSS": { 
            scale: 130,
            linebreaks: { automatic: true } 
          },
          SVG: { linebreaks: { automatic: true } }
        });
      };

      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    };

    setupMathJax();
  }, []);

  // Trigger MathJax rendering whenever results change
  useEffect(() => {
    if (latexResults.length > 0 && window.MathJax) {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }, 100);
    }
  }, [latexResults]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setLatexResults([]);
    setVariables({});
  };

  const handleCalculate = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsCalculating(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8900";
      const response = await axios.post(`${baseUrl}/calculator/calculate`, {
        image: canvas.toDataURL("image/png"),
        dict_of_vars: variables
      });

      let calculations: CalculationResponse[] = [];
      
      // Handle different response formats
      if (typeof response.data === "string") {
        try {
          calculations = JSON.parse(response.data.replace(/'/g, '"'));
          console.log(calculations);
        } catch (e) {
          console.error("Error parsing response:", e);
          return;
        }
      } else if (Array.isArray(response.data)) {
        calculations = response.data;
      } else if (response.data.data) {
        calculations = response.data.data;
      }

      // Don't clear existing results, append new ones
      const newResults = calculations.map((calc: CalculationResponse, index) => {
        if (calc.assign) {
          setVariables(prev => ({
            ...prev,
            [calc.expr]: calc.result.toString()
          }));
        }

        // Create LaTeX representation
        const latex = `$$${calc.expr} = ${calc.result}$$`;
        
        // Calculate position based on canvas center and existing results
        const position = {
          x: canvas.width / 2 - 100,
          y: 100 + (index + latexResults.length) * 60
        };

        return { latex, position };
      });

      setLatexResults(prev => [...prev, ...newResults]);

    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.lineCap = "round";
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [color]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = color;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    ctx.stroke();
  };

  return (
    <div className="h-screen w-full relative bg-gray-900">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800">
        <Button 
          onClick={clearCanvas}
          className="bg-red-600 hover:bg-red-700"
        >
          Reset
        </Button>

        <div className="flex gap-2">
          {SWATCHES.map((swatch) => (
            <button
              key={swatch}
              onClick={() => setColor(swatch)}
              className="w-8 h-8 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: swatch }}
            />
          ))}
        </div>

        <Button 
          onClick={handleCalculate}
          className="bg-green-600 hover:bg-green-700"
        >
          Calculate
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full bg-black"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => setIsDrawing(false)}
        onMouseOut={() => setIsDrawing(false)}
      />

      {latexResults.map((result, index) => (
        <Draggable
          key={`${result.latex}-${index}`}
          defaultPosition={result.position}
          bounds="parent"
        >
          <div className="absolute cursor-move">
            <div className="text-3xl text-white p-4 rounded bg-gray-800 bg-opacity-75 whitespace-nowrap">
              <div dangerouslySetInnerHTML={{ __html: result.latex }} />
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
}







// // above code will give the result but has a issue with it 





// import React, { useEffect, useRef, useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Slider } from "../../components/ui/slider";

// import { SWATCHES } from "../../constrants";

// import { Eraser, Pencil } from "lucide-react";



// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8900";

// interface Response {
//   expr: string;
//   result: string;
//   assign: boolean;
// }

// interface GeneratedResult {
//   expression: string;
//   answer: string;
//   position: { x: number; y: number };
// }

// interface DraggablePosition {
//   id: number;
//   x: number;
//   y: number;
// }

// interface DrawingAppProps {
//   apiUrl?: string;
// }

// const DrawingApp = ({ apiUrl = API_URL }: DrawingAppProps) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("#FFFFFF");
//   const [lineWidth, setLineWidth] = useState(3);
//   const [isEraser, setIsEraser] = useState(false);
//   const [results, setResults] = useState<GeneratedResult[]>([]);
//   const [dictOfVars, setDictOfVars] = useState<Record<string, any>>({});
//   const [draggingId, setDraggingId] = useState<number | null>(null);
//   const [positions, setPositions] = useState<DraggablePosition[]>([]);
//   const dragStartPos = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     initCanvas();
//   }, []);

//   const initCanvas = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight - 80;
//         ctx.lineCap = "round";
//         ctx.lineJoin = "round";
//         ctx.fillStyle = "#000000";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         ctx.beginPath();
//         ctx.moveTo(
//           e.clientX - rect.left,
//           e.clientY - rect.top
//         );
//         setIsDrawing(true);
        
//         ctx.strokeStyle = isEraser ? "#000000" : color;
//         ctx.lineWidth = isEraser ? lineWidth * 2 : lineWidth;
//       }
//     }
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;
    
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         ctx.lineTo(
//           e.clientX - rect.left,
//           e.clientY - rect.top
//         );
//         ctx.stroke();
//       }
//     }
//   };

//   const startDragging = (e: React.MouseEvent, id: number) => {
//     setDraggingId(id);
//     dragStartPos.current = {
//       x: e.clientX - (positions.find(p => p.id === id)?.x || 0),
//       y: e.clientY - (positions.find(p => p.id === id)?.y || 0)
//     };
//   };

//   const handleDrag = (e: React.MouseEvent) => {
//     if (draggingId === null) return;

//     setPositions(prev => prev.map(pos => 
//       pos.id === draggingId 
//         ? { 
//             ...pos, 
//             x: e.clientX - dragStartPos.current.x,
//             y: e.clientY - dragStartPos.current.y
//           }
//         : pos
//     ));
//   };

//   const calculateResult = async () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     try {
//       const response = await fetch(
//         `${apiUrl}/calculator/calculate`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             image: canvas.toDataURL("image/png"),
//             dict_of_vars: dictOfVars
//           })
//         }
//       );

//       const data = await response.json();
//       const newResults: GeneratedResult[] = [];
      
//       data.data.forEach((item: Response) => {
//         if (item.assign) {
//           setDictOfVars(prev => ({
//             ...prev,
//             [item.expr]: item.result
//           }));
//         }
        
//         const pos = getDrawingCenter(canvas);
//         const newResult = {
//           expression: item.expr,
//           answer: item.result,
//           position: pos
//         };
//         newResults.push(newResult);
        
//         setPositions(prev => [...prev, {
//           id: prev.length,
//           x: pos.x,
//           y: pos.y
//         }]);
//       });

//       setResults(prev => [...prev, ...newResults]);
//     } catch (error) {
//       console.error("Calculation error:", error);
//     }
//   };

//   const getDrawingCenter = (canvas: HTMLCanvasElement) => {
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return { x: 100, y: 100 };

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     let minX = canvas.width, minY = canvas.height;
//     let maxX = 0, maxY = 0;

//     for (let y = 0; y < canvas.height; y++) {
//       for (let x = 0; x < canvas.width; x++) {
//         const idx = (y * canvas.width + x) * 4;
//         if (imageData.data[idx + 3] > 0) {
//           minX = Math.min(minX, x);
//           maxX = Math.max(maxX, x);
//           minY = Math.min(minY, y);
//           maxY = Math.max(maxY, y);
//         }
//       }
//     }

//     return {
//       x: (minX + maxX) / 2,
//       y: (minY + maxY) / 2
//     };
//   };

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Toolbar */}
//       <div className="fixed top-0 left-0 right-0 bg-gray-900 p-4 flex items-center gap-4 z-10">
//         <Button 
//           onClick={() => {
//             initCanvas();
//             setResults([]);
//             setPositions([]);
//           }}
//           variant="destructive"
//           className="hover:bg-red-600"
//         >
//           Reset
//         </Button>

//         <div className="flex gap-2">
//           {SWATCHES.map((swatch) => (
//             <button
//               key={swatch}
//               className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 ${
//                 color === swatch ? 'ring-2 ring-white' : ''
//               }`}
//               style={{ backgroundColor: swatch }}
//               onClick={() => {
//                 setColor(swatch);
//                 setIsEraser(false);
//               }}
//             />
//           ))}
//         </div>

//         <Button
//           onClick={() => setIsEraser(!isEraser)}
//           variant="outline"
//           className={`${isEraser ? 'bg-blue-500' : ''}`}
//         >
//           {isEraser ? <Eraser className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
//         </Button>

//         <div className="flex items-center gap-2 w-48">
//           <span className="text-white">Size:</span>
//           <Slider
//             value={[lineWidth]}
//             onValueChange={(value) => setLineWidth(value[0])}
//             min={1}
//             max={20}
//             step={1}
//             className="w-32"
//           />
//         </div>

//         <Button
//           onClick={calculateResult}
//           className="ml-auto bg-green-500 hover:bg-green-600"
//         >
//           Calculate
//         </Button>
//       </div>

//       {/* Canvas */}
//       <canvas
//         ref={canvasRef}
//         className="cursor-crosshair"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={() => setIsDrawing(false)}
//         onMouseOut={() => setIsDrawing(false)}
//       />

//       {/* Results */}
//       <div 
//         className="absolute inset-0 pointer-events-none"
//         onMouseMove={handleDrag}
//         onMouseUp={() => setDraggingId(null)}
//       >
//         {results.map((result, index) => {
//           const position = positions[index] || { x: 0, y: 0 };
//           return (
//             <div
//               key={index}
//               className="absolute bg-black bg-opacity-50 p-2 rounded cursor-move pointer-events-auto"
//               style={{
//                 transform: `translate(${position.x}px, ${position.y}px)`,
//                 userSelect: 'none'
//               }}
//               onMouseDown={(e) => startDragging(e, index)}
//             >
//               <div className="text-white font-mono">
//                 {`${result.expression} = ${result.answer}`}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DrawingApp;







//<--------------old code ----------------->








// import { useEffect, useRef, useState } from "react";
// import { SWATCHES } from "../../constrants";
// import { ColorSwatch, Group } from "@mantine/core";
// import { Button } from "../../components/ui/button";
// import Draggable from 'react-draggable';
// import axios from "axios";

// interface Response {
//   expr: string;
//   result: string;
//   assign: boolean;
// }

// interface LatexExpression {
//   latex: string;
//   position: { x: number; y: number };
// }

// export default function Home() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("rgb(255,255,255)");
//   const [reset, setReset] = useState(false);
//   const [latexExpressions, setLatexExpressions] = useState<LatexExpression[]>([]);
//   const [variables, setVariables] = useState<Record<string, string>>({});

//   useEffect(() => {
//     if (reset) {
//       resetCanvas();
//       setLatexExpressions([]);
//       setVariables({});
//       setReset(false);
//     }
//   }, [reset]);

//   // Initialize MathJax
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       window.MathJax.Hub.Config({
//         tex2jax: {
//           inlineMath: [['$', '$'], ['\\(', '\\)']],
//           displayMath: [['$$', '$$']],
//           processEscapes: true
//         },
//         "HTML-CSS": { 
//           scale: 130,
//           linebreaks: { automatic: true } 
//         }
//       });
//     };

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   // Render MathJax when expressions change
//   useEffect(() => {
//     if (latexExpressions.length > 0 && window.MathJax) {
//       setTimeout(() => {
//         window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
//       }, 100);
//     }
//   }, [latexExpressions]);

//   // Initialize canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const updateCanvasSize = () => {
//       const rect = canvas.getBoundingClientRect();
//       canvas.width = rect.width;
//       canvas.height = rect.height;
//       ctx.lineCap = "round";
//       ctx.lineWidth = 3;
//       ctx.strokeStyle = color;
//     };

//     updateCanvasSize();
//     window.addEventListener('resize', updateCanvasSize);
//     return () => window.removeEventListener('resize', updateCanvasSize);
//   }, [color]);

//   const addLatexExpression = (expr: string, result: string) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const latex = `$$${expr} = ${result}$$`;
//     const position = {
//       x: canvas.width / 2 - 100,
//       y: canvas.height / 2 - 50 + (latexExpressions.length * 60)
//     };

//     setLatexExpressions(prev => [...prev, { latex, position }]);
//   };

//   const sendData = async () => {
//     const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8900";
    
//     try {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       const response = await axios.post(
//         `${baseUrl}/calculator/calculate`,
//         {
//           image: canvas.toDataURL("image/png"),
//           dict_of_vars: variables,
//         },
//         {
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );

//       let calculations: Response[] = [];
      
//       if (typeof response.data === 'string') {
//         calculations = JSON.parse(response.data.replace(/'/g, '"'));
//       } else if (response.data.data) {
//         calculations = response.data.data;
//       } else if (Array.isArray(response.data)) {
//         calculations = response.data;
//       }

//       calculations.forEach((data: Response) => {
//         if (data.assign) {
//           setVariables(prev => ({
//             ...prev,
//             [data.expr]: data.result
//           }));
//         }
//         addLatexExpression(data.expr, data.result);
//       });

//       // Clear the canvas after processing
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }

//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   const resetCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
    
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.strokeStyle = color;
//     const rect = canvas.getBoundingClientRect();
//     ctx.beginPath();
//     ctx.moveTo(
//       e.clientX - rect.left,
//       e.clientY - rect.top
//     );
//     setIsDrawing(true);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const rect = canvas.getBoundingClientRect();
//     ctx.lineTo(
//       e.clientX - rect.left,
//       e.clientY - rect.top
//     );
//     ctx.stroke();
//   };

//   return (
//     <div className="h-screen w-full relative bg-gray-900">
//       <div className="grid grid-cols-3 gap-1 absolute top-0 left-0 w-full z-10 bg-gray-800 p-4">
//         <Button
//           onClick={() => setReset(true)}
//           className="bg-red-600 hover:bg-red-700"
//           variant="default">
//           Reset
//         </Button>

//         <Group>
//           {SWATCHES.map((swatchColor: string) => (
//             <ColorSwatch
//               key={swatchColor}
//               color={swatchColor}
//               onClick={() => setColor(swatchColor)}
//             />
//           ))}
//         </Group>

//         <Button
//           onClick={sendData}
//           className="bg-green-600 hover:bg-green-700"
//           variant="default">
//           Calculate
//         </Button>
//       </div>

//       <canvas
//         ref={canvasRef}
//         className="w-full h-full bg-black"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={() => setIsDrawing(false)}
//         onMouseOut={() => setIsDrawing(false)}
//       />

//       {latexExpressions.map((expr, index) => (
//         <Draggable
//           key={index}
//           defaultPosition={expr.position}
//           bounds="parent"
//         >
//           <div className="absolute cursor-move">
//             <div className="text-3xl text-white p-4 rounded bg-gray-800 bg-opacity-75 whitespace-nowrap">
//               <div dangerouslySetInnerHTML={{ __html: expr.latex }} />
//             </div>
//           </div>
//         </Draggable>
//       ))}
//     </div>
//   );
// }


// import { useEffect, useRef, useState } from "react";
// import { SWATCHES } from "../../constrants";
// import { ColorSwatch, Group } from "@mantine/core";
// import { Button } from "../../components/ui/button";
// import Draggable from "react-draggable";
// import axios from "axios";

// interface Response {
//   expr: string;
//   result: string;
//   assign: boolean;
// }

// interface GeneratedResult {
//   expression: string;
//   answer: string;
// }

// interface LatexEntry {
//   latex: string;
//   position: { x: number; y: number };
// }

// export default function Home() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [color, setColor] = useState("rgb(255,255,255)");
//   const [reset, setReset] = useState(false);
//   const [result, setResult] = useState<GeneratedResult>();
//   const [latexExpressions, setLatexExpressions] = useState<LatexEntry[]>([]);
//   const [dictOfVars, setDictOfVars] = useState<Record<string, string>>({});

//   useEffect(() => {
//     if (reset) {
//       resetCanvas();
//       setLatexExpressions([]);
//       setResult(undefined);
//       setDictOfVars({});
//       setReset(false);
//     }
//   }, [reset]);

//   useEffect(() => {
//     if (latexExpressions.length > 0 && window.MathJax) {
//       window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
//     }
//   }, [latexExpressions]);

//   useEffect(() => {
//     if (result) {
//       renderLatexToCanvas(result.expression, result.answer);
//     }
//   }, [result]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         canvas.width = rect.width;
//         canvas.height = rect.height;
//         ctx.lineCap = "round";
//         ctx.lineWidth = 3;
//       }
//     }

//     // Configure MathJax
//     window.MathJax = {
//       tex: {
//         inlineMath: [['$', '$'], ['\\(', '\\)']],
//         processEscapes: true
//       },
//       svg: {
//         fontCache: 'global'
//       }
//     };

//     const script = document.createElement("script");
//     script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.js";
//     script.async = true;
//     document.head.appendChild(script);

//     return () => {
//       if (script.parentNode) {
//         document.head.removeChild(script);
//       }
//     };
//   }, []);

//   const getCanvasCenter = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return { x: 0, y: 0 };
    
//     return {
//       x: canvas.width / 2,
//       y: canvas.height / 2
//     };
//   };

//   const renderLatexToCanvas = (expression: string, answer: string) => {
//     const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
//     const center = getCanvasCenter();
    
//     setLatexExpressions(prev => [...prev, {
//       latex,
//       position: {
//         x: center.x - 100, // offset to roughly center the expression
//         y: center.y
//       }
//     }]);

//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const sendData = async () => {
//     const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8900";
    
//     try {
//       const canvas = canvasRef.current;
//       if (canvas) {
//         const response = await axios.post(`${baseUrl}/calculator/calculate`, {
//           image: canvas.toDataURL("image/png"),
//           dict_of_vars: dictOfVars,
//         });

//         const resp = response.data.data;
//         resp.forEach((data: Response) => {
//           if (data.assign) {
//             setDictOfVars(prev => ({
//               ...prev,
//               [data.expr]: data.result,
//             }));
//           }

//           setTimeout(() => {
//             setResult({
//               expression: data.expr,
//               answer: data.result,
//             });
//           }, 200);
//         });
        
//         // Clear canvas after processing
//         resetCanvas();
//       }
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   const updateLatexPosition = (index: number, newPosition: { x: number; y: number }) => {
//     setLatexExpressions(prev => {
//       const updated = [...prev];
//       updated[index] = {
//         ...updated[index],
//         position: newPosition
//       };
//       return updated;
//     });
//   };

//   const resetCanvas = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         ctx.beginPath();
//         ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
//         setIsDrawing(true);
//       }
//     }
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         const rect = canvas.getBoundingClientRect();
//         ctx.strokeStyle = color;
//         ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
//         ctx.stroke();
//       }
//     }
//   };

//   return (
//     <div className="h-screen w-full relative">
//       <div className="grid grid-cols-3 gap-1 absolute top-0 left-0 w-full z-10 bg-white p-4">
//         <Button
//           onClick={() => setReset(true)}
//           className="bg-black text-white"
//           variant="default"
//         >
//           Reset
//         </Button>

//         <Group>
//           {SWATCHES.map((swatchColor: string) => (
//             <ColorSwatch
//               key={swatchColor}
//               color={swatchColor}
//               onClick={() => setColor(swatchColor)}
//             />
//           ))}
//         </Group>

//         <Button
//           onClick={sendData}
//           className="bg-black text-white"
//           variant="default"
//         >
//           Calculate
//         </Button>
//       </div>

//       <canvas
//         ref={canvasRef}
//         className="w-full h-full"
//         onMouseDown={startDrawing}
//         onMouseUp={stopDrawing}
//         onMouseOut={stopDrawing}
//         onMouseMove={draw}
//       />

//       {latexExpressions.map((entry, index) => (
//         <Draggable
//           key={index}
//           defaultPosition={entry.position}
//           onStop={(e, data) => updateLatexPosition(index, { x: data.x, y: data.y })}
//         >
//           <div className="absolute text-black bg-white p-2 rounded shadow-lg cursor-move">
//             <div className="latex-content">{entry.latex}</div>
//           </div>
//         </Draggable>
//       ))}
//     </div>
//   );
// }