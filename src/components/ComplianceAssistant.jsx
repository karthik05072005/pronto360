import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, CheckCircle, FileText, Download, User, Bot, ChevronRight, X, ArrowLeft, ArrowRight } from "lucide-react";
import { categoryQuestions, generateRequiredLicenses } from "../config/licenseRules";
import { licenseDocuments } from "../config/licenseDocuments";
import ChoiceButton from "./ChoiceButton";
import { generateChecklistPDF } from "../utils/generateChecklistPDF";
import "../styles/ComplianceAssistant.css";

const ComplianceAssistant = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [responses, setResponses] = useState({});
  const [requiredLicenses, setRequiredLicenses] = useState([]);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [clinicData, setClinicData] = useState({
    ultrasound: null,
    ot: null,
    beds: "",
    xray: null,
    chairs: null,
    diagnostic: null,
    imaging: null
  });
  
  const [errors, setErrors] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const bedsInputRef = useRef(null);

  const categories = [
    { id: "Medical", name: "Medical", icon: "🏥️" },
    { id: "Dental", name: "Dental", icon: "🦷" },
    { id: "Lab", name: "Diagnostic Lab", icon: "🔬" },
    { id: "Ayurveda", name: "Ayurveda", icon: "🌿" },
    { id: "Homeopathy", name: "Homeopathy", icon: "🏠" },
    { id: "Physiotherapy", name: "Physiotherapy", icon: "🏃‍♂️" },
    { id: "Non-Medical Owner", name: "Non-Medical Owner", icon: "💼" }
  ];

  const messagesEndRef = useRef(null);

  const messages = [
    {
      id: 1,
      type: "assistant",
      content: "Welcome to PRONTO360 Compliance Assistant. Let's understand your clinic setup to determine required approvals.",
      timestamp: new Date()
    }
  ];

  const [chatMessages, setChatMessages] = useState(messages);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Smooth scroll to top when step changes
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, currentQuestionIndex]);

  useEffect(() => {
    if (currentStep === 2 && selectedCategory && bedsInputRef.current) {
      // Focus on input when it's a number type question
      const questions = categoryQuestions[selectedCategory.id] || [];
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion && currentQuestion.type === "number" && bedsInputRef.current) {
        setTimeout(() => {
          bedsInputRef.current?.focus();
        }, 100);
      }
    }
  }, [currentStep, selectedCategory, currentQuestionIndex]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const simulateTyping = (callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1500);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setCurrentStep(2);
    
    const newMessage = {
      id: Date.now(),
      type: "user",
      content: `Selected: ${category.name}`,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    simulateTyping(() => {
      const questions = categoryQuestions[category.id] || [];
      
      if (questions.length === 0) {
        // Generate licenses directly for categories with no questions
        const licenses = generateRequiredLicenses(category.id, {});
        setRequiredLicenses(licenses);
        setCurrentStep(4);
        
        const responseMessage = {
          id: Date.now(),
          type: "assistant",
          content: `Thank you! Based on your ${category.name} setup, I'm analyzing the required approvals...`,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, responseMessage]);
        
        setTimeout(() => {
          const resultMessage = {
            id: Date.now(),
            type: "assistant",
            content: "Based on your clinic setup, you require the following approvals:",
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, resultMessage]);
          setCurrentStep(5);
        }, 2000);
      } else {
        const responseMessage = {
          id: Date.now(),
          type: "assistant",
          content: `Great! Now let me understand your ${category.name} setup better. Please answer the following questions:`,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, responseMessage]);
      }
    });
  };

  const validateInput = (questionId, value, questionType) => {
    const newErrors = { ...errors };
    
    if (questionType === "number") {
      if (value === "" || value === null) {
        newErrors[questionId] = "Please enter a valid number";
        setErrors(newErrors);
        return false;
      }
      if (isNaN(value) || Number(value) < 0) {
        newErrors[questionId] = "Please enter a valid positive number";
        setErrors(newErrors);
        return false;
      }
    }
    
    // Clear error if validation passes
    if (newErrors[questionId]) {
      delete newErrors[questionId];
      setErrors(newErrors);
    }
    return true;
  };

  const validateStep = (step) => {
    if (step === 2) {
      // Validate Details step
      const questions = categoryQuestions[selectedCategory.id] || [];
      const currentQuestion = questions[currentQuestionIndex];
      
      if (currentQuestion && currentQuestion.type === "number") {
        const value = clinicData[currentQuestion.id];
        return validateInput(currentQuestion.id, value, "number");
      }
      
      // For boolean questions, check if answered
      if (currentQuestion && currentQuestion.type === "boolean") {
        return responses[currentQuestion.id] !== undefined;
      }
    }
    return true;
  };

  const handleNavigation = (direction) => {
    if (direction === "next") {
      if (validateStep(currentStep)) {
        if (currentStep === 2) {
          // Handle question navigation
          const questions = categoryQuestions[selectedCategory.id] || [];
          const answeredQuestions = Object.keys(responses).filter(key => 
            questions.some(q => q.id === key)
          );
          
          if (answeredQuestions.length < questions.length) {
            // Move to next question
            setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
          } else {
            // All questions answered, move to next step
            setCurrentStep(prev => Math.min(prev + 1, 5));
          }
        } else {
          // Move to next step
          setCurrentStep(prev => Math.min(prev + 1, 5));
        }
      }
    } else if (direction === "back") {
      if (currentStep === 2) {
        // Handle question navigation
        const questions = categoryQuestions[selectedCategory.id] || [];
        if (currentQuestionIndex > 0) {
          // Move to previous question
          setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
        } else {
          // Move to previous step
          setCurrentStep(prev => Math.max(prev - 1, 1));
        }
      } else {
        // Move to previous step
        setCurrentStep(prev => Math.max(prev - 1, 1));
      }
    }
  };

  const handleQuestionResponse = (questionId, response, questionType = "boolean") => {
    // Validate input for number fields
    if (questionType === "number" && !validateInput(questionId, response, questionType)) {
      return;
    }
    
    // Update clinic data state
    setClinicData(prev => ({
      ...prev,
      [questionId]: questionType === "number" ? Number(response) : response
    }));
    
    const newResponses = { ...responses, [questionId]: response };
    setResponses(newResponses);
    
    const newMessage = {
      id: Date.now(),
      type: "user",
      content: questionType === "number" ? `${response} beds` : response,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
    
    // Move to next question or finish
    const questions = categoryQuestions[selectedCategory.id] || [];
    const answeredQuestions = Object.keys(newResponses).filter(key => 
      questions.some(q => q.id === key)
    );
    
    if (answeredQuestions.length < questions.length) {
      // Move to next question
      setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
    } else {
      // All questions answered
      simulateTyping(() => {
        const licenses = generateRequiredLicenses(selectedCategory.id, newResponses);
        setRequiredLicenses(licenses);
        setCurrentStep(4);
        
        const responseMessage = {
          id: Date.now(),
          type: "assistant",
          content: "Thank you! Based on your clinic setup, I'm analyzing the required approvals...",
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, responseMessage]);
        
        setTimeout(() => {
          const resultMessage = {
            id: Date.now(),
            type: "assistant",
            content: "Based on your clinic setup, you require the following approvals:",
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, resultMessage]);
          setCurrentStep(5);
        }, 2000);
      });
    }
  };

  const handleDocumentRequest = () => {
    setShowDocuments(true);
    
    const newMessage = {
      id: Date.now(),
      type: "user",
      content: "Yes, show me the required documents",
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
    
    simulateTyping(() => {
      const responseMessage = {
        id: Date.now(),
        type: "assistant",
        content: "Here are the required documents for each approval:",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, responseMessage]);
    });
  };

  const handleConsultationRequest = () => {
    setShowLeadForm(true);
    
    const newMessage = {
      id: Date.now(),
      type: "user",
      content: "Yes, I want to request a consultation",
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, label: "Category" },
      { number: 2, label: "Details" },
      { number: 3, label: "Analysis" },
      { number: 4, label: "Results" },
      { number: 5, label: "Documents" }
    ];

    return (
      <div className="bg-muted rounded-lg p-4 mb-4 step-indicator">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  currentStep >= step.number
                    ? "bg-primary text-white active"
                    : currentStep > step.number
                    ? "bg-success text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.number}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.number ? "text-primary" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-3 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMessage = (message) => {
    if (message.type === "assistant") {
      return (
        <div className="flex items-start gap-3 mb-4 chat-message">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-border max-w-md chat-bubble">
            <p className="text-foreground text-sm leading-relaxed">{message.content}</p>
            <span className="text-xs text-muted-foreground mt-2">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-start gap-3 mb-4 justify-end chat-message">
          <div className="bg-primary text-white rounded-2xl rounded-tr-none p-4 shadow-sm max-w-md chat-bubble">
            <p className="text-sm leading-relaxed">{message.content}</p>
            <span className="text-xs text-primary-foreground/80 mt-2">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      );
    }
  };

  const renderLicenseCards = () => {
    return (
      <div className="grid gap-3 mb-4">
        {requiredLicenses.map((license, index) => (
          <div
            key={license.id}
            className="bg-white rounded-xl p-4 border-l-4 border-l-primary border border-border shadow-sm hover:shadow-md transition-all duration-200 license-card"
            style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
          >
            <div className="flex items-start gap-3">
              <img
                src={`/logos/${license.id}.png`}
                alt={license.name}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'/%3E%3C/svg%3E";
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-primary text-sm">{license.name}</h4>
                  {license.mandatory && (
                    <span className="bg-success text-white text-xs px-2 py-1 rounded-full font-medium">
                      Mandatory
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{license.description}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-muted rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">
              Total Approvals Required: {requiredLicenses.length}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentChecklist = () => {
    return (
      <div className="space-y-4">
        {requiredLicenses.map((license) => {
          const docs = licenseDocuments[license.id];
          if (!docs) return null;
          
          return (
            <div key={license.id} className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="bg-muted p-4 border-b border-border">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  {docs.title}
                </h4>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {docs.documents.map((doc) => (
                    <li key={doc.id} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button 
                  className="mt-4 w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2"
                  onClick={() => generateChecklistPDF(requiredLicenses, licenseDocuments)}
                >
                  <Download className="w-4 h-4" />
                  Download Document Checklist PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLeadForm = () => {
    return (
      <div className="bg-white rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Request Consultation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">City</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Your city"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
              Submit Request
            </button>
            <button
              onClick={() => setShowLeadForm(false)}
              className="px-4 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 compliance-assistant">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">PRONTO360 Compliance Assistant</h2>
              <p className="text-sm text-gray-600">Intelligent License Recommendation System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pt-4">
          {renderStepIndicator()}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 chat-container">
          <div className="space-y-4 pb-4">
            {chatMessages.map((message) => (
              <div key={message.id}>{renderMessage(message)}</div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-border max-w-md">
                  <div className="flex items-center gap-2 typing-indicator">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Category Selection */}
            {currentStep === 1 && (
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-border max-w-md">
                  <p className="text-foreground text-sm mb-4">Please select your clinic category:</p>
                  <div className="choice-group">
                    {categories.map((category) => (
                      <ChoiceButton
                        key={category.id}
                        label={category.name}
                        value={category.id}
                        selected={selectedCategory.id === category.id}
                        onSelect={() => handleCategorySelection(category)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Questions */}
            {currentStep === 2 && selectedCategory && (
              <div className="space-y-6">
                {(() => {
                  const questions = categoryQuestions[selectedCategory.id] || [];
                  const currentQuestion = questions[currentQuestionIndex];
                  
                  if (!currentQuestion) return null;
                  
                  return (
                    <div className="chat-block">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="assistant-message">
                            <p className="text-foreground text-sm leading-relaxed">{currentQuestion.question}</p>
                          </div>
                          
                          {currentQuestion.type === "boolean" && (
                            <div className="mt-3 choice-group">
                              {currentQuestion.options?.map((option) => (
                                <ChoiceButton
                                  key={option}
                                  label={option}
                                  value={option}
                                  selected={responses[currentQuestion.id] === option}
                                  onSelect={(value) => handleQuestionResponse(currentQuestion.id, value, "boolean")}
                                />
                              ))}
                            </div>
                          )}
                          
                          {currentQuestion.type === "number" && (
                            <div className="mt-3">
                              <input
                                ref={bedsInputRef}
                                type="number"
                                min="0"
                                placeholder={currentQuestion.placeholder || "Enter number"}
                                value={clinicData[currentQuestion.id] || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setClinicData(prev => ({
                                    ...prev,
                                    [currentQuestion.id]: value
                                  }));
                                  // Clear error when user types
                                  if (errors[currentQuestion.id]) {
                                    setErrors(prev => {
                                      const newErrors = { ...prev };
                                      delete newErrors[currentQuestion.id];
                                      return newErrors;
                                    });
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleQuestionResponse(currentQuestion.id, clinicData[currentQuestion.id] || "", "number");
                                  }
                                }}
                                className={`bed-input ${errors[currentQuestion.id] ? 'error' : ''}`}
                              />
                              {errors[currentQuestion.id] && (
                                <p className="text-red-500 text-xs mt-2">{errors[currentQuestion.id]}</p>
                              )}
                              <p className="text-gray-500 text-xs mt-2">
                                Leave 0 if not applicable
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Step 5: Results */}
            {currentStep === 5 && requiredLicenses.length > 0 && (
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-border max-w-md">
                  {renderLicenseCards()}
                  
                  {!showDocuments && (
                    <div className="mt-4">
                      <p className="text-foreground text-sm mb-3">Would you like to see the required documents for these approvals?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleDocumentRequest}
                          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                        >
                          Yes, Show Documents
                        </button>
                        <button className="bg-gray-100 text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                          No, Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {showDocuments && (
                    <div className="mt-4">
                      <p className="text-foreground text-sm mb-3">Here are the required documents for each approval:</p>
                      {renderDocumentChecklist()}
                    </div>
                  )}

                  {!showDocuments && !showLeadForm && (
                    <div className="mt-4">
                      <p className="text-foreground text-sm mb-3">Would you like our team to assist you with these approvals?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleConsultationRequest}
                          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                        >
                          Yes, Request Consultation
                        </button>
                        <button className="bg-gray-100 text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                          Download Checklist Only
                        </button>
                      </div>
                    </div>
                  )}

                  {showLeadForm && renderLeadForm()}
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Navigation Buttons */}
        <div className="assistant-navigation">
          {currentStep > 1 && (
            <button
              className="back-btn"
              onClick={() => handleNavigation("back")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}
          
          {currentStep < 5 && (
            <button
              className="next-btn"
              onClick={() => handleNavigation("next")}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceAssistant;
