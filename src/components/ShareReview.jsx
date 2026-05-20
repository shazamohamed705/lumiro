import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./ShareReview.module.css";

/* ── Success Toast ── */
function SuccessToast({ isRTL, onClose }) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 240);
  }, [onClose]);

  useEffect(() => {
    const t = setTimeout(() => handleClose(), 4000);
    return () => clearTimeout(t);
  }, [handleClose]);

  return createPortal(
    <div
      className={`${styles["sr__toast"]} ${closing ? styles["sr__toastOut"] : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
      role="status"
      aria-live="polite"
    >
      <span className={styles["sr__toastIcon"]} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span className={styles["sr__toastMsg"]}>
        {isRTL ? "شكراً! تم إرسال تقييمك بنجاح" : "Thank you! Your review has been submitted"}
      </span>
      <button
        className={styles["sr__toastClose"]}
        onClick={handleClose}
        aria-label={isRTL ? "إغلاق" : "Close"}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>,
    document.body
  );
}

export default function ShareReview({ productId, isRTL }) {
  const { isRTL: contextIsRTL } = useLang();
  const rtl = isRTL !== undefined ? isRTL : contextIsRTL;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const maxImages = 3;
  const maxChars = 500;
  const remainingChars = maxChars - reviewText.length;

  const handleStarClick = useCallback((value) => {
    setRating(value);
  }, []);

  const handleStarHover = useCallback((value) => {
    setHoverRating(value);
  }, []);

  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, maxImages - uploadedImages.length);

    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  }, [uploadedImages.length]);

  const removeImage = useCallback((index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert(rtl ? "يرجى اختيار تقييم" : "Please select a rating");
      return;
    }

    if (reviewText.trim().length === 0) {
      alert(rtl ? "يرجى كتابة تقييم" : "Please write a review");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setRating(0);
      setReviewText("");
      setUploadedImages([]);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  }, [rating, reviewText, rtl]);

  return (
    <section
      className={styles["share__container"]}
      dir={rtl ? "rtl" : "ltr"}
      aria-label={rtl ? "شارك تقييمك" : "Share Your Review"}
    >
      {/* Header */}
      <div className={styles["share__header"]}>
        <h2 className={styles["share__title"]}>
          {rtl ? "شارك تقييمك" : "Share Your Review"}
        </h2>
        <p className={styles["share__subtitle"]}>
          {rtl
            ? "رأيك يصنع الفرق.. ساعدنا لنقدم لك الأفضل دائماً"
            : "Your opinion makes a difference. Help us provide the best always"}
        </p>
      </div>

      {/* Success Toast */}
      {submitSuccess && (
        <SuccessToast rtl={rtl} isRTL={rtl} onClose={() => setSubmitSuccess(false)} />
      )}

      <form onSubmit={handleSubmit} className={styles["share__form"]}>
        {/* Rating Section */}
        <div className={styles["share__section"]}>
          <label className={styles["share__label"]}>
            {rtl ? "تقييم النجوم" : "Rate the Product"}
          </label>
          <div className={styles["share__starsContainer"]}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={styles["share__starBtn"]}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${star} ${rtl ? "نجوم" : "stars"}`}
                aria-pressed={rating === star}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill={star <= (hoverRating || rating) ? "#f5a623" : "none"}
                  stroke={star <= (hoverRating || rating) ? "#f5a623" : "#ddd"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles["share__starIcon"]}
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className={styles["share__ratingText"]}>
              {rtl ? `تقييمك: ${rating} نجوم` : `Your rating: ${rating} stars`}
            </p>
          )}
        </div>

        {/* Review Text Section */}
        <div className={styles["share__section"]}>
          <label htmlFor="reviewText" className={styles["share__label"]}>
            {rtl ? "اكتب تقييمك" : "Write Your Review"}
          </label>
          <textarea
            id="reviewText"
            className={styles["share__textarea"]}
            placeholder={
              rtl
                ? "اكتب تفاصيل تجربتك مع المنتج أو الخدمة..."
                : "Share details about your experience with the product or service..."
            }
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value.slice(0, maxChars))}
            onFocus={(e) => {
              // scroll the textarea into view above the mobile keyboard
              setTimeout(() => {
                e.target.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 300);
            }}
            maxLength={maxChars}
            rows="4"
            aria-describedby="charCount"
          />
          <div className={styles["share__charCount"]} id="charCount">
            <span
              className={`${styles["share__charCountText"]} ${
                remainingChars < 50 ? styles["share__charCountWarning"] : ""
              }`}
            >
              {remainingChars} {rtl ? "حرف متبقي" : "characters remaining"}
            </span>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className={styles["share__section"]}>
          <label className={styles["share__label"]}>
            {rtl ? "أضف صور" : "Add Photos"}
            <span className={styles["share__optional"]}>
              ({uploadedImages.length}/{maxImages})
            </span>
          </label>

          {/* Upload Button */}
          <div className={styles["share__uploadArea"]}>
            <input
              type="file"
              id="imageUpload"
              className={styles["share__fileInput"]}
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploadedImages.length >= maxImages}
              aria-label={rtl ? "رفع الصور" : "Upload images"}
            />
            <label htmlFor="imageUpload" className={styles["share__uploadBtn"]}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="13" r="3" />
                <path d="M12 2v2m0 16v2M4.22 4.22l1.41 1.41m9.9 9.9l1.41 1.41M2 12h2m16 0h2M4.22 19.78l1.41-1.41m9.9-9.9l1.41-1.41" />
              </svg>
              <span>{rtl ? "اضغط لإضافة صور" : "Click to add photos"}</span>
            </label>
          </div>

          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className={styles["share__imagesGrid"]}>
              {uploadedImages.map((img, index) => (
                <div key={index} className={styles["share__imageItem"]}>
                  <img src={img} alt={`Review ${index + 1}`} />
                  <button
                    type="button"
                    className={styles["share__removeImageBtn"]}
                    onClick={() => removeImage(index)}
                    aria-label={rtl ? "حذف الصورة" : "Remove image"}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className={styles["share__footer"]}>
          <button
            type="submit"
            className={`${styles["share__submitBtn"]} ${
              isSubmitting ? styles["share__submitBtnLoading"] : ""
            }`}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles["share__spinner"]} aria-hidden="true" />
                {rtl ? "جاري الإرسال..." : "Submitting..."}
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                {rtl ? "إرسال التقييم" : "Submit Review"}
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
