"use client";

import { useState, useEffect } from "react";
import { returnBrigade } from "@/actions/returnBrigade"; // Обновите путь к функции returnBrigade, если необходимо
import LoadingButton from "./LoadingButton";

const ReturnBrigade: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [commentMedicalKit, setCommentMedicalKit] = useState("");
  const [commentAmbulance, setCommentAmbulance] = useState("");
  const [brigadeChecked, setBrigadeChecked] = useState(false);
  const [carClean, setCarClean] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("commentMedicalKit", commentMedicalKit);
      formData.append("commentAmbulance", commentAmbulance);
      await returnBrigade(formData); // Вызываем функцию returnBrigade
    } catch (error) {
      console.error("Error returning brigade:", error);
    } finally {
      setIsLoading(false); // Устанавливаем состояние загрузки в false
      onToggle(); // Закрываем форму после отправки
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white text-xs p-2 flex items-center justify-center rounded-md mt-2"
        onClick={onToggle}
      >
        Сдать бригаду
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={onToggle}
          ></div>
          <div
            className={`fixed bottom-0 left-0 w-full h-4/5 bg-neutral-900 z-40 shadow-lg rounded-t-lg flex flex-col transition-transform duration-300 ease-in-out ${
              isAnimating ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="p-2 bg-neutral-900 z-20 sticky top-0">
              <div className="w-full flex justify-center items-center text-center mb-4 font-bold">
                <span>Сдаем бригаду</span>
              </div>
            </div>
            <form
              action={returnBrigade}
              className="flex-1 overflow-y-auto px-6 pt-2"
            >
              <div className="relative mb-6">
                <textarea
                  className="peer block min-h-[auto] w-full rounded border-0 dark:bg-gray-700 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300"
                  name="commentMedicalKit"
                  placeholder=""
                  value={commentMedicalKit}
                  onChange={(e) => setCommentMedicalKit(e.target.value)}
                ></textarea>
                <label
                  htmlFor="commentMedicalKit"
                  className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 ${
                    commentMedicalKit ? "-translate-y-[0.9rem] scale-[0.8]" : ""
                  }`}
                >
                  Комментарий при возврате укладки
                </label>
              </div>
              <div className="relative mb-6">
                <textarea
                  className="peer block min-h-[auto] w-full rounded border-0 dark:bg-gray-700 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300"
                  name="commentAmbulance"
                  placeholder=""
                  value={commentAmbulance}
                  onChange={(e) => setCommentAmbulance(e.target.value)}
                ></textarea>
                <label
                  htmlFor="commentAmbulance"
                  className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400 ${
                    commentAmbulance ? "-translate-y-[0.9rem] scale-[0.8]" : ""
                  }`}
                >
                  Комментарий при возврате автомобиля
                </label>
              </div>
              <div className="flex items-center mb-6">
                <label
                  htmlFor="brigadeChecked"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Бригада проверена?
                </label>
                <input
                  type="checkbox"
                  id="brigadeChecked"
                  className="ml-2"
                  checked={brigadeChecked}
                  onChange={(e) => setBrigadeChecked(e.target.checked)}
                />
              </div>
              <div className="flex items-center mb-6">
                <label
                  htmlFor="carClean"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Машина чистая?
                </label>
                <input
                  type="checkbox"
                  id="carClean"
                  className="ml-2"
                  checked={carClean}
                  onChange={(e) => setCarClean(e.target.checked)}
                />
              </div>
              <LoadingButton onClick={handleSubmit} isLoading={isLoading}>
                Сдать бригаду
              </LoadingButton>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ReturnBrigade;
